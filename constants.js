const PORTSERVER=3001;
//const PORTSERVER=8009;

exports.PORTSERVER= PORTSERVER;

//Token Config
exports.SECRET_JWT="seCret_test";

// 1Hora 60*60
exports.TOKEN_EXPIRE=6000*60;
//4 Horas
exports.TOKEN_REFRESH_EXPIRE=120*120;

//Database configuration
exports.DB_USER="DB";
exports.DB_PASSWORD="****";
exports.DB_URL="mysql:URL";

//Bcrypt Salt
exports.BC_SALT=10;
exports.SERVER_TIMEOUT=5000;

exports.EM_USER="mail@mail.url";
exports.EM_PASSWORD="pass";
exports.EM_HOST="email_host.url";
exports.EM_PORT=587;
exports.EM_SECURE=false;
