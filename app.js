//imports
const express = require('express');
const passport = require('passport');
const constants = require('./constants.js');
const authRoutes = require('./routes/authRoutes.js');
require('./Config/passport.js');

//constants
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const log4js = require('log4js');


//Basic configuration os Logs 
log4js.configure({
    appenders: { general: { type: 'file', filename: 'logs/general.log' } },
    categories: { default: { appenders: ['general'], level: 'DEBUG' } }
  });

  const logger = log4js.getLogger('general');

//Start passport
app.use(passport.initialize());

//Configure  entdpoints for authentication
app.use('/auth',authRoutes);

app.timeout = constants.SERVER_TIMEOUT;
app.listen(constants.PORTSERVER, function () {
    logger.info('Server listening on port:'+constants.PORTSERVER);
  });