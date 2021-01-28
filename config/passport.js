const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database.js');
const encryptation = require('./encryptation.js');

//Deserializators
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

//Local Strategy, connect to login server
passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'},
  async function(email, password, next) {
    //Sanitización
    let emailSanitized = email.replace(/[*+?^${}()|'[\]\\]/g, '');
    let passwordSanitized = password.replace(/[*+?^${}()|'[\]\\]/g, '');
    //With real database use async await 
    let userEncriptedPassword = db.findUser(emailSanitized,passwordSanitized);
    let match = await encryptation.comparePassword(passwordSanitized,userEncriptedPassword)
      if(match){
        let userToken = {
          email : emailSanitized,
        };
        return await next(null, userToken);
      }
    return next(null, false);
}));