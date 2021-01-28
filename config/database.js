const constants = require('../constants.js');
const log4js = require('log4js');
const logger = log4js.getLogger('general');



function findUser(email) {
    if( email =="test@test.url"){
        //passwordTest1
        return "$2y$10$nADtU4zj4Z99fYb7r9Duhux4rXxEtHiL.f.sM.5ksxgdVmislECsy"
    }else{
        return "";
    }
}

//Control of functions exports
module.exports ={findUser}