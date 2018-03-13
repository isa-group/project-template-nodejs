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

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
})

// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    })
}