var express   = require("express");
var app       = express();
var server    = require('http').Server(app);
const path    = require('path');
var init      = require("./src/framework/brainpi/src/Config/init");
var config    = require("./src/config/index");
var Route     = require("./src/framework/brainpi/src/Route/Route");
var Bootstrap = require("./src/bootstrap/Bootstrap");
var cron      = require("node-cron");
var fs        = require("fs")


const viewEngineSettings    = Bootstrap.templateEngine();
const viewDirectorySettings = Bootstrap.viewDirectory();

if(viewEngineSettings.usingEngine) {
    app.set('view engine', viewEngineSettings.name);
}
app.set('views', path.join(__dirname, viewDirectorySettings.path));

server.listen(2200, "0.0.0.0");


// init.logConfiguration(); // Logs the configuration file in the console

// config.load("dataNodeTwo").open('11311').then(contents => {
//     console.log(contents)
// });

// config.load("dataNodeOne").query("Select * from users where ID = ?", 2).then(results => {
//     console.log(results);
// })


    // config.load("dataNodeOne")
    //     .table("Users")
    //     .insert(["name", "email", "password"])
    //     .withValues(["Aaaa", "aaaaahiggins@email.com", "123456"])
    //     .execute().then(result => {
    //         console.log(result);
    //     });

    // config.load("dataNodeOne")
    //                     .table("Users")
    //                     .select(["name", "email", "password"])
    //                     .where("Name", "=", "Adrian")
    //                     .execute().then(result => {
    //                         console.log(result);
    //                     });

if(init.readConfiguration().cron.runOnServerUp) {
    require("./src/framework/brainpi/src/Job/bin/load")(cron, fs);
}
require("./src/route/http")(new Route(app));