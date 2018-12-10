var express = require("express");
var app     = express();
var server  = require('http').Server(app);
// var init = require("./config/bin/init");
var config  = require("./config/index");
var Uri     = require("./vendor/brainpi/src/Uri/Uri");

server.listen(2200, "0.0.0.0");

// init.readConfiguration();
// init.logConfiguration();

// config.load("dataNodeTwo").open('11311').then(contents => {
//     console.log(contents)
// });

const uriMap = require("./uri/http")(new Uri(app));

