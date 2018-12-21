const init = require("../Config/init");

class Route {

    constructor( app ) {
        this.app = app;
        this.configurationFile = init.readConfiguration();
    }

    Get( stringPath, stringHandler ) {
        const getPath           = this.configurationFile.app.dir,
              getResource       = stringHandler.split("@")[0],
              getMethod         = stringHandler.split("@")[1];

        // append if dir doesnt end in /   

        var getHandler = require(`${getPath}controllers/${getResource}`);

        this.app.get(stringPath, function(req, res){
            eval(`getHandler.${getMethod}(req,res)`);
        });  
    }


    Post( stringPath, stringHandler ) {
        const postPath     = this.configurationFile.app.dir,
              postResource = stringHandler.split("@")[0],
              postMethod   = stringHandler.split("@")[1];

        // append if dir doesnt end in /   

        var postHandler = require(`${postPath}controllers/${postResource}`);

        this.app.post(stringPath, function(req, res){
            eval(`postHandler.${postMethod}(req,res)`);
        });  

        
    }
}

module.exports = Route;