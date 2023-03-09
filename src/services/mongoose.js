const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('The database is now connected!');
}

module.exports = { connectDb }