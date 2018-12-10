var CsvClass = require("../../vendor/brainpi/src/Csv/Csv");

class CsvConfig {

    constructor() {
        this.Csv = null;
    }

    process( dataString , configurationFile ) {

        const filesystem = eval("configurationFile.filesystem."+dataString);

        if(filesystem == null) {
            process.exit(22);
        }

        this.Csv = new CsvClass(
            filesystem.type,
            filesystem.ref,
            filesystem.path
        );

        return this.Csv;

    }
}

module.exports = new CsvConfig();