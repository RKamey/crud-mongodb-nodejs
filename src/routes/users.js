const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.render('login', { error: 'Error logging in'})
        }
        if (user.password !== password) {
            return res.render('login', { error: 'Error logging in'});
        }
        res.redirect('/restaurants');
    } catch (error) {
        console.log(error);
        res.status(500).render('error'), { error: 'Internal Server Error'};
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.render('register', { error: 'User already exists'});
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/restaurants');
    } catch (error) {
        console.log(error);
        res.status(500).render('error', { error: 'Internal Server Error'});
    }
});

module.exports = router;