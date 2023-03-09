const express = require('express');
const router = new express.Router();
const User = require('../models/User');

router.post('/users', async (req, res) => {
    if (await User.findOne({ email: req.body.email })) return res.status(400).send('Failed to create account!');

    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;