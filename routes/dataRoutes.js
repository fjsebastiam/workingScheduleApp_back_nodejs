const express = require('express');
const passport = require('passport');
const constants = require('../constants.js');
const jwt = require('jsonwebtoken');
const path = express.Router();


const securityMiddlewares = require('./middlewares/securityMiddlewares.js');

//Private endpoint
path.get('/testAuth',securityMiddlewares.isAuthenticated,async function(req, res) {
      let message = "The api with Auth middleware is works";
      return res.status(400).json({ success: true,refresh : false, message: message});
});

//Public endpoint
path.get('/testWithoutAuth',async function(req, res) {
    let message = "The api is works";
    return res.status(400).json({ success: true,refresh : false, message: message});
});

module.exports = path;