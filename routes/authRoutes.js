const express = require('express');
const passport = require('passport');
const constants = require('../constants.js');
const jwt = require('jsonwebtoken');
const path = express.Router();
const bodyParser = require('body-parser');
const tokenList = {}

path.use(bodyParser.urlencoded({ extended: false }));

path.post('/local', passport.authenticate('local', { session: false }), function(req,res){

  if(!req.user===false){
      let token = jwt.sign({
        user : req.user
      }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_EXPIRE });
      let tokenRefresh = jwt.sign({
      }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_REFRESH_EXPIRE });
      const response = {
        "Authorization": 'Bearer '+ token,
        "AuthorizationRefresh": 'Bearer '+ tokenRefresh,
        "userEmail" :  req.user.email,
      }
      tokenList[tokenRefresh] = response

    res.status(200).json(response);

    }else{
      return res.status(401).send({ success: false, refresh : false, error: 'Failed to authenticate token.' });
    }
});

//End Point with verify Logic
path.post('/verify', function (req, res) {
    if (req.headers['x-access-token'] && req.headers['refresh-token']) {
      let token = req.headers['x-access-token'].split(" ")[1];
      let tokenRefresh = req.headers['refresh-token'].split(" ")[1];
      if (token && tokenRefresh) {
        try {
          let user = jwt.decode(token).user;
          jwt.verify(token, constants.SECRET_JWT, function(err, decoded) {
            if (err) {
              //Check refresh token
              jwt.verify(tokenRefresh, constants.SECRET_JWT, function(err, decoded) {
                if(err){
                  return res.json({ success: false, refresh : false, message: 'Failed to verificate refresh token.' });
                }else{
                  //Crear token nuevo
                  let token = jwt.sign({
                    user : user
                  }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_EXPIRE });
                  let tokenRefresh = jwt.sign({
                  }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_REFRESH_EXPIRE });

                  res.setHeader('Authorization', 'Bearer '+ token);
                  res.setHeader('AuthorizationRefresh', 'Bearer '+ tokenRefresh);

                  return res.json({ success: true, refresh : true, message: 'Refresh Success' });
                }
              });
            } else {
                // if everything is good return this json
                res.setHeader('Authorization', 'Bearer '+ token);
                res.setHeader('AuthorizationRefresh', 'Bearer '+ tokenRefresh);
                  return res.json({ success: true,refresh : false, message: 'Is verified.' });
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
});
module.exports = path;