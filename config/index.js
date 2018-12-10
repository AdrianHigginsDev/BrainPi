const components    = require("../vendor/brainpi/src/Config/index"),
      init          = require("./bin/init"),
      MySqlConfig   = require("./bin/MySqlConfig"),
      CsvConfig     = require("./bin/CsvConfig"),
      MongoDbConfig = require("./bin/MongoDbConfig");

class Config {

    constructor() {
        this.configurationFile = init.readConfiguration();
    }

    load( dataString ) {
        var dataType = eval("this.configurationFile.data."+dataString).type;

        if(dataType == null) {
            return null;
        }

        switch( dataType.toLowerCase() ) {

            case 'mysql': {
                return this.handleMySql( dataString );
            }
            case 'mongodb': {
                return this.handleMongoDb( dataString );
            }
            case 'csv': {
                return this.handleCsv( dataString );
            }
            default: {
                return null;
            }
        }
    }

    handleMySql( dataString ) {

        const MySql = MySqlConfig.process( dataString , this.configurationFile );

        return MySql;

    }

    handleCsv( dataString ) {

        const Csv = CsvConfig.process( dataString , this.configurationFile );

        return Csv;

    }

    handleMongoDb( dataString ) {

        const MongoDb = MongoDbConfig.process( dataString , this.configurationFile );

        return MongoDb;
        
    }
}

module.exports = new Config();