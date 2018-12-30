var expressClass              = require("express");
var express                   = expressClass();
var server                    = require('http').Server(express);
const path                    = require('path');
const { App, Route, Init, 
    JobLoader }               = require("brainpi");
var Bootstrap                 = require("./bootstrap/Bootstrap");
var cron                      = require("node-cron");
var fs                        = require("fs")

//// Getting User Set Setting ////
const viewEngineSettings       = Bootstrap.templateEngine();
const viewDirectorySettings    = Bootstrap.viewDirectory();
const routeDirectoryHttp       = Bootstrap.routesDirectoryHttp();
const routeDirectoryApi        = Bootstrap.routesDirectoryApi();

//// Turn On Specified View Engine, If Using One ////
if(viewEngineSettings.usingEngine) {
    express.set('view engine', viewEngineSettings.name);
}
//// Set Path To Response Views ////
express.set('views', path.join(__dirname, viewDirectorySettings.path));
express.use(expressClass.static(__dirname + '/public'));


//// Launch Server ////
server.listen(2200, "0.0.0.0");

//// Turn On Cron Jobs If Set To True ////
if(Init.readConfiguration().cron.runOnServerUp) {
    JobLoader.loadAll(cron, fs, Init.readConfiguration().app.dir);
}

//// Register Routes ////
require(`./${routeDirectoryHttp.path}`)(new Route(express));

require(`./${routeDirectoryApi.path}`)(new Route(express));







/********* FOLLOWING LINES ARE FOR FEATURE TESTING PURPOSES *********/


// Init.logConfiguration(); // Logs the configuration file in the console

App.load("csv_example").open('11311').then(contents => {
    console.log(contents)
});

// App.load("mysql_example").query("Select * from users where ID = ?", 2).then(results => {
//     console.log(results);
// })

const { Mail } = require("brainpi");

// Mail.config("amhigs98@gmail.com", "amhigs98@gmail.com", "Test", "Testing out mail").send();

// const UserClass = require("./models/User");


// const PersonalInformationClass = require("./models/PersonalInformation");

// var PersonalInformation;

// var User;

// Grabs the Last User in the Database
// UserClass.last().then(data => {
//     User = data[0];

//     // Grabs PI Related to User
//     User.infos().then(data => {
//         PersonalInformation = data[0];

//         // Grabs user related to PI
//         PersonalInformation.user().then(data => {
//             console.log(data[0]);
//         })

        /*
            infos() method calls this.hasOne(PersonalInformation)

            Which returns the personal_informations field that is linked to the users field
        */
//     })
// })


// PersonalInformationClass.first().then(data => {
//     PersonalInformation = data[0];
    
//     PersonalInformation.users();
// })

// App.load("mysql_example")
//     .table("Users")
//     .insert(["name", "email", "password"])
//     .withValues(["Aaaa", "aaaaahiggins@email.com", "123456"])
//     .execute().then(result => {
//         console.log(result);
//     });

// App.load("mongo_example").then(db => {
//     db.collection("seacreatures").findOne({}, result => {
//         console.log(result)
//     }).catch(function (err) {})
// })

// App.load("mysql_example")
//         .table("Users")
//         .select(["name", "email", "password"])
//         .where("Name", "=", "Adrian")
//         .execute().then(result => {
//             console.log(result);
//         });

/*********** ABOVE LINES ARE FOR FEATURE TESTING PURPOSES ***********/