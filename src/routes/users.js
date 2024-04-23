const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('login');
  });
  
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;