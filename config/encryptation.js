bcrypt = require('bcrypt');
const constants = require('../constants.js');

async function hashPassword(passwordString) {

    const password = passwordString
    const saltRounds = constants.BC_SALT;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}

async function comparePassword(loginPassword,databasePassword) {
 const match = await bcrypt.compare(loginPassword, databasePassword);
 return match;
}

module.exports = {hashPassword,comparePassword}