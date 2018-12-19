const init = require("../Config/init");

class Uri {

    constructor( app ) {
        this.app = app;
        this.configurationFile = init.readConfiguration();
    }

    Output( stringPath, stringHandler ) {
        const outputPath           = this.configurationFile.app.dir,
              outputResource       = stringHandler.split("@")[0],
              outputMethod         = stringHandler.split("@")[1];

        // append if dir doesnt end in /   

        var outputHandler = require(`${outputPath}IO/output/${outputResource}/index`);

        this.app.get(stringPath, function(req, res){
            eval(`outputHandler.${outputMethod}(req,res)`);
        });  
    }


    Input( stringPath, stringHandler ) {
        const inputPath     = this.configurationFile.app.dir,
              inputResource = stringHandler.split("@")[0],
              inputMethod   = stringHandler.split("@")[1];

        // append if dir doesnt end in /   

        var inputHandler = require(`${inputPath}IO/input/${inputResource}/index`);

        this.app.post(stringPath, function(req, res){
            eval(`inputHandler.${inputMethod}(req,res)`);
        });  

        
    }
}

module.exports = Uri;