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
 * Module dependecies.
 * */

var winston = require('winston');
require("winston-daily-rotate-file");
var config = require('../configurations/config');

/**
 * Configure here your custom levels.
 * */
var customLeves = {
    levels: {
        error: 7,
        warning: 8,
        custom: 9,
        info: 12,
        debug: 13
    },
    colors: {
        error: 'red',
        warning: 'yellow',
        custom: 'magenta',
        info: 'white',
        debug: 'black'
    }
};

winston.emitErrs = true;

var logger = new winston.Logger({
  levels: customLeves.levels,
  colors: customLeves.colors,
  transports: [
    new winston.transports.DailyRotateFile({
      createTree: true,
      level: config.log.level,
      prepend: true,
      filename: config.log.file,
      handleExceptions: true,
      json: false,
      maxDays: config.log.maxDays,
      datePattern: "/yyyy/MM/dd."
      //   maxsize: 5242880, //5MB
      //   maxFiles: 10,
      //   colorize: false,
    }),
    new winston.transports.Console({
      level: config.loglevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    })
  ],
  exitOnError: false
});

/*
 * Export functions and Objects
 */
module.exports = logger;
