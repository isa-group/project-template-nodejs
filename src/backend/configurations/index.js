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

/**
 * Module dependencies.
 * */

const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

/*
 * Export functions and Objects
 */
let config = {
  addConfiguration: _addConfiguration
};

module.exports = config;

/*
 * Implement the functions
 */
function _addConfiguration(uri, encoding) {
  let configString = null;

  if (!uri) {
    throw new Error('Parameter URI is required');
  } else {
    configString = fs.readFileSync(path.join(__dirname, uri), encoding);
  }

  const newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

  for (let c in newConfigurations) {
    this[c] = newConfigurations[c];
  }
}

/*
 * Setup default config location
 */
config.addConfiguration('config.yaml', 'utf8');
