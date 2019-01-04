const { App, Route, Init, 
    JobLoader, ErrorLog }      = require("brainpi");
var expressClass               = require("express");
var express                    = expressClass();
var server                     = require('http').Server(express);
const path                     = require('path');
var Bootstrap                  = require("./bootstrap/Bootstrap");
var cron                       = require("node-cron");
var fs                         = require("fs");
                                 require('run-middleware')(express);

//// Getting Bootstrap Setting ////
const viewEngineSettings       = Bootstrap.templateEngine(),
      viewDirectorySettings    = Bootstrap.viewDirectory(),
      routeDirectoryHttp       = Bootstrap.routesDirectoryHttp(),
      routeDirectoryApi        = Bootstrap.routesDirectoryApi(),
      env                      = Init.readConfiguration().app.environment;


//// Turn On Specified View Engine, If Using One ////
if(viewEngineSettings.usingEngine) {
    express.set('view engine', viewEngineSettings.name);
}
//// Set Path To Response Views ////
express.set('views', path.join(__dirname, viewDirectorySettings.path));
express.use(expressClass.static(__dirname + '/public'));

//// Launch Server ////
server.listen(8000, "0.0.0.0");

// Exception Handling On Enviroment Modes
process.on('uncaughtException', function(err) {
    if(env == "dev" || 
    env == "development") {
        ErrorLog.write(err.stack);
        throw new Error(err)
    } else if (env == "prod" ||
    env == "production") {
        ErrorLog.write(err.stack);
        console.log(err.stack)
    } else if (env == "test" ||
    env == "testing") {
        ErrorLog.write(err.stack);
        console.log(err.stack)
        process.exit(1);
    }
    else {
        throw new Error(err);
    }
    
});

//// Turn On Cron Jobs If Set To True ////
if(Init.readConfiguration().cron.runOnServerUp) {
    JobLoader.loadAll(cron, fs, Init.readConfiguration().app.dir);
}

//// Register Routes ////
require(`./${routeDirectoryHttp.path}`)(new Route(express));

require(`./${routeDirectoryApi.path}`)(new Route(express));

// Static 404 handler
express.get("/404", function(request, response) {
    response.sendFile(__dirname + "/"+Bootstrap.errorViewDirectory().path+"/404.html");
})
