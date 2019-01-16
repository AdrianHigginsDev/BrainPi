const { Route, Init, 
    JobLoader, ErrorLog, 
    Middleware }               = require("brainpi"),
    expressClass               = require("express"),
    express                    = expressClass(),
    server                     = require('http').Server(express),
    path                       = require('path'),
    bodyParser                 = require("body-parser"),
    Bootstrap                  = require("./bootstrap/Bootstrap"),
    cron                       = require("node-cron"),
    fs                         = require("fs");
                                 require('run-middleware')(express);

/*===========================================
  Getting Bootstrap Setting
============================================*/
const viewEngineSettings       = Bootstrap.templateEngine(),
      viewDirectorySettings    = Bootstrap.viewDirectory(),
      routeDirectoryHttp       = Bootstrap.routesDirectoryHttp(),
      routeDirectoryApi        = Bootstrap.routesDirectoryApi(),
      errorDirectory           = Bootstrap.errorViewDirectory(),
      env                      = Init.readConfiguration().app.environment,
      port                     = isNaN(Init.readConfiguration().app.port) ? 8000 : parseInt(Init.readConfiguration().app.port);
/*===========================================
  Turn On Specified View Engine, If Using One
============================================*/
if(viewEngineSettings.usingEngine)
    express.set('view engine', viewEngineSettings.name);
/*===========================================
  Set Path To Response Views
============================================*/
express.set('views', path.join(__dirname, viewDirectorySettings.path));
express.use(expressClass.static(__dirname + '/public'));
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
/*===========================================
  Launch Our Server
============================================*/
server.listen(port, "0.0.0.0");
console.log(`Server Running On Port: ${port}`)
/*===========================================
  Exception Handling On Enviroment Modes
============================================*/
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
/*===========================================
  Turn On Cron Jobs If Set To True
============================================*/
if(Init.readConfiguration().cron.runOnServerUp)
    JobLoader.loadAll(cron, fs, Init.readConfiguration().app.dir);
/*===========================================
  Register Routes
============================================*/
require(`./${routeDirectoryHttp.path}`)(new Route(express), new Middleware(express));
require(`./${routeDirectoryApi.path}`)( new Route(express), new Middleware(express));
/*===========================================
  Static 404 handler
============================================*/
express.get("/404", function(request, response) {
    response.render(`${errorDirectory.path}/404`);
})