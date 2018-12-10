const components  = require("../vendor/brainpi/src/Config/index");
const init        = require("./bin/init");
const MySqlConfig = require("./bin/MySqlConfig");
const CsvConfig   = require("./bin/CsvConfig");

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
                return this.handleMySql(dataString);
            }
            case 'csv': {
                return this.handleCsv(dataString);
            }
            default: {
                return null;
            }
        }
    }

    handleMySql( dataString ) {

        const MySqlClass = MySqlConfig.process( dataString , this.configurationFile );

        return MySqlClass;

    }

    handleCsv( dataString ) {

        CsvConfig.process( dataString , this.configurationFile );

    }
}

module.exports = new Config();