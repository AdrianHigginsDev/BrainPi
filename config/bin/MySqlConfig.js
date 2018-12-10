var MySql = require("../../vendor/brainpi/src/MySql/MySql");

class MySqlConfig {

    constructor() {
        this.MySqlClass = null;
    }

    process( dataString , configurationFile ) {

        const database = eval("configurationFile.database."+dataString);

        if(database == null) {
            return null;
        }

        this.MySqlClass = new MySql(
            database.CONNECTION,
            database.HOST,
            database.PORT,
            database.DATABASE,
            database.USERNAME,
            database.PASSWORD
        );

        return this.MySqlClass;

    }

}

module.exports = new MySqlConfig();