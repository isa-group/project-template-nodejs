/*!
project-template-nodejs 0.0.0, built on: 2017-02-10
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

/*
 * Put here your dependecies
 */
var logger = require('./logger/logger');
var moment = require('moment');
var Promise = require('bluebird');

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
            reject(new Error("Params are require"));
        }
    });

}