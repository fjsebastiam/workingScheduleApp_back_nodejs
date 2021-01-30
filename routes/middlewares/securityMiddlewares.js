const express = require('express');
const passport = require('passport');
const constants = require('../../constants.js');
const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const logger = log4js.getLogger('general');


//Middleware para comprobar los tokens
function isAuthenticated(req, res, next) {
    if (req.headers['x-access-token'] && req.headers['refresh-token']) {
      let token = req.headers['x-access-token'].split(" ")[1];
      let tokenRefresh = req.headers['refresh-token'].split(" ")[1];
      if (token && tokenRefresh) {
        try {
          let user = jwt.decode(token).user;
          jwt.verify(token, constants.SECRET_JWT, function(err, decoded) {
            if (err) {
              jwt.verify(tokenRefresh, constants.SECRET_JWT, function(err, decoded) {
                if(err){
                  return res.status(401).json({ success: false, refresh : false, message: 'Failed to verificate refresh token.' });
                }else{
                  //create new token
                  let token = jwt.sign({
                    user : user
                  }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_EXPIRE });
                  let tokenRefresh = jwt.sign({
                  }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_REFRESH_EXPIRE });
  
                  res.setHeader('Authorization', 'Bearer '+ token);
                  res.setHeader('AuthorizationRefresh', 'Bearer '+ tokenRefresh);
  
                  return next();
                }
              });
            } else {
                res.setHeader('Authorization', 'Bearer '+ token);
                res.setHeader('AuthorizationRefresh', 'Bearer '+ tokenRefresh);
                return next();
                }
              });
            } catch (err) {
            res.status(401).json({ success: false,refresh : false, message: 'Malformed' });
          }
        } else {
          res.status(401).json({ success: false,refresh : false, message: 'Empty tokens' });
        }
    } else {
      res.status(401).json({ success: false,refresh : false, message: 'Invalid token' });
    }
  }

  //Control of functions exports
module.exports ={isAuthenticated}