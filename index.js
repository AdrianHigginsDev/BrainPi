var express = require("express");
var app     = express();
var server  = require('http').Server(app);
// var init = require("./config/bin/init");
var config  = require("./config/index");

server.listen(2200, "0.0.0.0");

// init.readConfiguration();
// init.logConfiguration();

console.log(config.load("dataNodeOne")); 