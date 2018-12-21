var config  = require("../../../../../../src/config/index");

class ShockPattern {


    static first() {
        var tableName = this.pluralize(),
            dataNode  = this.connector();

        var x = dataNode;

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id ASC LIMIT 1`);
    }

    static last() {
        var tableName = this.pluralize(),
            dataNode  = this.connector();

        var x = dataNode;

        var classObj = require(`../../../../../models/${this.name}`);

        var newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                console.log(newClassObj)
                return newClassObj;
            });
        });
        
    }


}

module.exports = ShockPattern;