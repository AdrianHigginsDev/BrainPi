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
      env                      = Init.readConfiguration().app.environment;
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
server.listen(8000, "0.0.0.0");
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

/********* FOLLOWING LINES ARE FOR FEATURE TESTING PURPOSES *********/

// const { ErrorLog } = require("brainpi");

// ErrorLog.write("Testing Error");

// var cool = File.findOrFail("storage/test/public/crab.png");

// console.log(cool)

// var x = App.load("files_example").findOrFail("/public/crab.png");
// console.log(x)

// Init.logConfiguration(); // Logs the configuration file in the console

// App.load("csv_example").open('11311').then(contents => {
//     console.log(contents)
// });

// App.load("mysql_example").query("Select * from users where ID = ?", 2).then(results => {
//     console.log(results);
// })

// const { Mail } = require("brainpi");

// Mail.config("amhigs98@gmail.com", "amhigs98@gmail.com", "Test", "Testing out mail").send();

// const UserClass = require("./models/User");

// const PersonalInformationClass = require("./models/PersonalInformation");

// var PersonalInformation;

// var User;

// UserClass.first().then(data => {
//     User = data;
//     User.validate();
// });

// UserClass.findById(4).then(data => {
//     console.log(data)
// })

// Grabs the Last User in the Database
// UserClass.last().then(data => {
//     User = data;

//     // Grabs PI Related to User
//     User.infos().then(data => {
//         PersonalInformation = data;
//         console.log(PersonalInformation)

//         // Grabs user related to PI
//         PersonalInformation.user().then(data => {
//             console.log(data);
//         })
//     })
// })
        /*
            infos() method calls this.hasOne(PersonalInformation)

            Which returns the personal_informations field that is linked to the users field
        */


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

        // App.load("mysql_example")
        // .table("Users")
        // .select(["*"])
        // .execute().then(result => {
        //     console.log(result);
        // });

        // App.load("postgres_example")
        // .table("testing")
        // .insert(["id", "age", "address", "salary"])
        // .withValues([2, 22, "2 street", "3000000"])
        // .execute().then(result => {
        //     console.log(result);
        // });

        // App.load("postgres_example").query("Select * from testing").then(results => {
        //     console.log(results)
        // })

/*********** ABOVE LINES ARE FOR FEATURE TESTING PURPOSES ***********/