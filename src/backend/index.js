/*!
project-template-nodejs 1.1.1, built on: 2018-03-27
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/project-template-nodejs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

"use strict";

/*
 * Put here your dependencies
 */
const http = require("http"); // Use https if your app will not be behind a proxy.
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const moment = require("moment");

const config = require("./configurations");
const logger = require("./logger");

const app = express();

app.use(compression());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: "true"
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
    type: "application/json"
  })
);

const frontendPath = __dirname + '/../frontend';
logger.info("Serving '%s' as static folder", frontendPath);
app.use(express.static(frontendPath));

if (config.server.bypassCORS) {
  logger.info("Adding 'Access-Control-Allow-Origin: *' header to every path.");
  app.use(cors());
}
if (config.server.useHelmet) {
  logger.info("Adding Helmet related headers.");
  app.use(helmet());
}

const serverPort = process.env.PORT || config.server.port;

const server = http.createServer(app);

server.listen(serverPort, function () {
  logger.info("Your server is listening on port %d (http://localhost:%d)", serverPort, serverPort);
});


/*
 * Export functions and Objects
 */
module.exports = {
  close: _close,
  myfunction: _myfunction,
  myPromiseFunction: _myPromiseFunction
};

/*
 * Implement the functions
 */

function _close(callback) {
  if (server.listening) {
    server.close(callback);
  } else {
    callback();
  }
}

function _myfunction(param1, param2) {
  logger.info("Hello world!");
  logger.info("Param1: %s", param1);
  logger.info("Param2: %s", param2);

  logger.info('Hello world!');
  logger.info('Param1: %s', param1);
  logger.info('Param2: %s', param2);

  logger.custom('Date: %s', moment().toISOString());

  return param1 + "-" + param2;

  return param1 + "-" + param2;
}

function _myPromiseFunction(param1, param2) {
  return new Promise(function (resolve, reject) {
    if (param1 && param2) {
      resolve(param1 + "-" + param2);
    } else {
      reject(new Error("Params are required"));
    }
  });
}