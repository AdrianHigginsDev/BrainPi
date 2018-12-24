var express                   = require("express");
var app                       = express();
var server                    = require('http').Server(app);
const path                    = require('path');
const { Config, Route, Init, 
    JobLoader }               = require("brainpi");
var Bootstrap                 = require("./bootstrap/Bootstrap");
var cron                      = require("node-cron");
var fs                        = require("fs")

//// Getting User Set Setting ////
const viewEngineSettings    = Bootstrap.templateEngine();
const viewDirectorySettings = Bootstrap.viewDirectory();

//// Turn On Specified View Engine, If Using One ////
if(viewEngineSettings.usingEngine) {
    app.set('view engine', viewEngineSettings.name);
}
//// Set Path To Response Views ////
app.set('views', path.join(__dirname, viewDirectorySettings.path));


//// Launch Server ////
server.listen(2200, "0.0.0.0");

//// Turn On Cron Jobs If Set To True ////
if(Init.readConfiguration().cron.runOnServerUp) {
    JobLoader.loadAll(cron, fs, Init.readConfiguration().app.dir);
}

//// Register Routes ////
require("./route/http")(new Route(app));







/********* FOLLOWING LINES ARE FOR FEATURE TESTING PURPOSES *********/


// Init.logConfiguration(); // Logs the configuration file in the console

// config.load("csv_example").open('11311').then(contents => {
//     console.log(contents)
// });

// Config.load("mysql_example").query("Select * from users where ID = ?", 2).then(results => {
//     console.log(results);
// })


// config.load("mysql_example")
//     .table("Users")
//     .insert(["name", "email", "password"])
//     .withValues(["Aaaa", "aaaaahiggins@email.com", "123456"])
//     .execute().then(result => {
//         console.log(result);
//     });

// Config.load("mysql_example")
//         .table("Users")
//         .select(["name", "email", "password"])
//         .where("Name", "=", "Adrian")
//         .execute().then(result => {
//             console.log(result);
//         });

/*********** ABOVE LINES ARE FOR FEATURE TESTING PURPOSES ***********/