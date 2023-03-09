const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate(v) {
            if (!validator.isEmail(v)) throw new Error('Invalid E-mail!');
        }
    },
    password: {
        type: String,
        required: true,
        validate(v) {
            if (!validator.isLength(v, { min: 8, max: 16 })) throw new Error('Password must be between 8 and 16 characters');
        }
    }
});

userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Failed to login!');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Failed to login!');
    return user;
}

userSchema.pre('save', async function () {
    if (this.isModified) this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model('User', userSchema);

module.exports = User;