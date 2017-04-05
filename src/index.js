/*!
project-template-nodejs 0.0.0, built on: 2017-03-30
Copyright (C) 2017 ISA group
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


'use strict';

/**
 * @SwaggerHeader
 * info:
 *   title: Swagger Sample App
 *   description: This is a sample server Petstore server.
 *   termsOfService: http://swagger.io/terms/
 *   contact:
 *     name: ISA GROUP
 *     url: http://www.isa.us.es/
 *     email: support@swagger.io
 *   license:
 *     name: Apache 2.0
 *     url: http://www.apache.org/licenses/LICENSE-2.0.html
 *   version: 1.0.1
 * host: localhost:5000
 * basePath: /api/v1
 * consumes:
 *   - application/json
 * produces:
 *   - application/json
 * tags:
 *   - name: pet
 *     description: Everything about your Pets
 *     externalDocs:
 *       description: Find out more
 *       url: http://swagger.io
 *   - name: other tag
*/


/*
 * Put here your dependecies
 */
var express = require('express'),
    helmet = require('helmet'),
    logger = require('./logger/logger'),
    moment = require('moment'),
    Promise = require('bluebird'),
    swaggerTools = require('swagger-tools'),
    config = require('./configurations/config');

/*
 * If you are going to use express, please include helmet library
 * in order to increase security in your webapp
 */

var port = process.env.PORT || config.server.port;
var app = express();
app.use(helmet());
app.use('/', express.static(__dirname + '/../public'));
var swaggerDoc = require('./swagger.json');



swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter());

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

})


/**
 * @SwaggerPath
 *   /pets:
 *     get:
 *       summary: just a test route
 *       description: nothing to see here
 *       tags:
 *         - pet
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: successful operation
 *           schema:
 *             $ref: "#/definitions/ApiResponse"
 */


app.get('/api/v1/pets',function(req,res){
    res.json([{
      pet : "dog"
    },
    {
      pet:"cat"
    }]);

})


app.listen(port);


/*
 * Export functions and Objects
 */
module.exports = {
    myfunction: _myfunction,
    myPromiseFunction: _myPromiseFunction
};


/*
 * Implement the functions
 */
function _myfunction(param1, param2) {

    logger.info('Hello world!');
    logger.info('Param1: %s', param1);
    logger.info('Param2: %s', param2);

    logger.custom('Date: %s', moment().toISOString());

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

/**
 * @SwaggerDefinitions
 *   ApiResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       type:
 *         type: string
 *       message:
 *         type: string
 */
