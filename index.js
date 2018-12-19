var express = require("express");
var app     = express();
var server  = require('http').Server(app);
var init    = require("./src/framework/brainpi/src/Config/init");
var config  = require("./src/config/index");
var Uri     = require("./src/framework/brainpi/src/Uri/Uri");
// var QB      = require("./src/framework/brainpi/src/QueryBuilder/QueryBuilder");

server.listen(2200, "0.0.0.0");

init.readConfiguration();
// init.logConfiguration();

// config.load("dataNodeTwo").open('11311').then(contents => {
//     console.log(contents)
// });

// config.load("dataNodeOne").query("Select * from users where ID = ?", 2).then(results => {
//     console.log(results);
// })

// var queryArray = QB.call("Users")
//                     .insert(["name", "email", "password"])
//                     .withValues(["Acw", "acehiggins@email.com", "123456"])
//                     .execute();


    config.load("dataNodeOne")
        .table("Users")
        .insert(["name", "email", "password"])
        .withValues(["Aaaa", "aaaaahiggins@email.com", "123456"])
        .execute().then(result => {
            console.log(result);
        });

const uriMap = require("./src/uri/http")(new Uri(app));


