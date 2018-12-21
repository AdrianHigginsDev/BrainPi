const Shock = require("../framework/brainpi/src/Shock/Shock");

class Model extends Shock {

    constructor() {
        super();
        this.properties = null;
    }

    set( property ) { 
        var properties = {};
        Object.keys(property).forEach(function(key) {
        //   var x = {[key]: property[key]};
          properties[[key]] = property[key];
        });

        this.properties = properties;
    }

    get( propertyName ) {
        console.log("HO")
        return this.properties[propertyName];
    }

}

module.exports = Model;