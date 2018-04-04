'use strict';

var server = require('./src/backend/index');
var logger = require('./src/backend/logger');

//if your project is a npm module:

module.exports = server;

//if your is not npm module

server.myPromiseFunction("1", "2").then(function (solution) {
    logger.info(solution);
}, function (err) {
    logger.error(err);
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    logger.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    logger.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            logger.error(err);
            process.exitCode = 1;
        }
        process.exit();
    });
}