#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('dev');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8001');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = app.listen(8001,function(){
  debug('hello')
});