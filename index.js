'use strict';

var src = require('./src/backend/index');
var logger = require('./src/backend/logger/logger');

//if your project is a npm module:

module.exports = src;

//if your is not npm module

src.myPromiseFunction("1", "2").then(function (solution) {
    logger.info(solution);
}, function (err) {
    logger.error(err);
});