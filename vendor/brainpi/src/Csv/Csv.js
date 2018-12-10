var CsvMapClass = require("./src/CsvMap");
const fs        = require("fs");
var init = require("../../../../config/bin/init");
var parse = require('csv-parse');

class Csv {

    constructor( type, ref, path ) {
        this.CsvMap = null;
        this.type   = type;
        this.ref    = ref;
        this.path   = path;
    }

    init() {

        if(!this.verify()) {
            process.exit(22);
        }

    }

    verify() {
        this.type.toLowerCase() === 'csv' ? true : false;
    }

    createCsvMap() {

    }

    open( name ) {
        const appDir = init.readConfiguration().app.dir;

        const path = `${appDir}${this.path}${name}.csv`;

        return new Promise(function(resolve) {
            var fileContent = fs.readFileSync(path, {encoding: 'utf8'});
            resolve(fileContent);
        });

    }
}

module.exports = Csv;