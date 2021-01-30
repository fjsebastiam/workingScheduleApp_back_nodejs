const constants = require('../constants.js');
const log4js = require('log4js');
const logger = log4js.getLogger('general');



function findUser(email) {
    if( email =="test@test.url"){
        //passwordTest1
        //$2b$10$881enOKgS4Ou4MuTYZ9NbeqvGzE5JhNBGg0Is5CvoZuYlDzPJo1ii
        return "$2b$10$881enOKgS4Ou4MuTYZ9NbeqvGzE5JhNBGg0Is5CvoZuYlDzPJo1ii"
    }else{
        return "";
    }
}

//Control of functions exports
module.exports ={findUser}