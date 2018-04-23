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
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

'use strict';

/*
 * Put here your dependencies
 */
const https = require("https"); // Use https if your app will not be behind a proxy.
const http = require("http"); // Use http if your app will be behind a proxy.
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const moment = require("moment");
const fs = require('fs');
const path = require('path');

const config = require('./configurations')
const logger = require('./logger')

const app = express()

const frontendPath = path.join(__dirname, '../frontend');
const serverPort = process.env.PORT || config.server.port;
const CURRENT_API_VERSION = "v1";
const httpsOptions = {
  key: fs.readFileSync('certs/privkey.pem'),
  cert: fs.readFileSync('certs/cert.pem')
};

app.use(express.static(frontendPath));

// Default server options

app.use(compression());

logger.info("Using '%s' as HTTP body size", config.server.bodySize);
app.use(
  bodyParser.urlencoded({
    limit: config.server.bodySize,
    extended: "true"
  })
)

app.use(
  bodyParser.json({
    limit: config.server.bodySize,
    type: "application/json"
  })
)

// Configurable server options

if (config.server.bypassCORS) {
  logger.info("Adding 'Access-Control-Allow-Origin: *' header to every path.")
  app.use(cors());
}

if (config.server.useHelmet) {
  logger.info('Adding Helmet related headers.')
  app.use(helmet());
}

if (config.server.httpOptionsOK) {
  app.options("/*", function (req, res) {
    logger.info("Bypassing 405 status put by swagger when no request handler is defined");
    return res.sendStatus(200);
  });
}

if (config.server.servePackageInfo) {
  app.use('/api/info', function (req, res) {
    logger.debug("Serving package.json at '%s'", "/api/info");
    res.json(require('./../../package.json'));
  });
}

const server = config.server.listenOnHttps ? https.createServer(httpsOptions, app) : http.createServer(app);

server.listen(serverPort, function () {
  logger.info("Your server is listening on port %d (localhost:%d)", serverPort, serverPort);
});


/*
 * Export functions and Objects
 */
module.exports = {
  close: _close,
  myfunction: _myfunction,
  myPromiseFunction: _myPromiseFunction
}

/*
 * Implement the functions
 */

function _close(callback) {
  if (server.listening) {
    server.close(callback)
  } else {
    callback()
  }
}

function _myfunction(param1, param2) {
  logger.info('Hello world!')
  logger.info('Param1: %s', param1)
  logger.info('Param2: %s', param2)

  logger.custom('Date: %s', moment().toISOString())

  return param1 + '-' + param2
}

function _myPromiseFunction(param1, param2) {
  return new Promise(function (resolve, reject) {
    if (param1 && param2) {
      resolve(param1 + '-' + param2)
    } else {
      reject(new Error('Params are required'))
    }
  })
}
