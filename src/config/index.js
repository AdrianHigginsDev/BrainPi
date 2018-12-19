const init          = require("../framework/brainpi/src/Config/init"),
      MySqlConfig   = require("../framework/brainpi/src/Config/MySqlConfig"),
      CsvConfig     = require("../framework/brainpi/src/Config/CsvConfig"),
      MongoDbConfig = require("../framework/brainpi/src/Config/MongoDbConfig");

class Config {

    constructor() {
        this.configurationFile = init.readConfiguration();
    }

    load( dataString ) {
        var dataType = eval("this.configurationFile.data."+dataString).type;

        if(dataType == null) {
            console.log(`ERROR: ${dataString} Not Found In configure.json`);
            process.exit(1);
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
                console.log(`ERROR: ${dataType} Is An Invalid Data Type On Node ${dataString}`);
                process.exit(1);
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