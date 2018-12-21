const ShockPattern = require("./src/ShockPattern");
var init = require("../Config/init");
var config  = require("../../../../../src/config/index");

class Shock extends ShockPattern {

    constructor() {
        super();
    }

    static pluralize() {
        var className = this.name.toLowerCase();
        if(className[className.length - 1] == "s") {
            className = `${className}es`;
        } else {
            className = `${className}s`;
        }
        return className;
    }

    objPluralize( obj ) {
        var className = obj.name.toLowerCase();
        if(className[className.length - 1] == "s") {
            className = `${className}es`;
        } else {
            className = `${className}s`;
        }
        return className;
    }

    static connector() {
        var prop                = this.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);

        if(typeNode == null) {
            throw new Error(`${dataNode} Does Not Exist In configure.json!`);
        }

        const type = typeNode.type;

        if(type == null) {
            throw new Error(`There is no TYPE defined for data node ${dataNode}!`);
        }

        return [type, dataNode];
    }

    connector() {
        var className = this.constructor.name,
            classObj  = require(`../../../../models/${className}`);

        
        var prop                = classObj.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);

        if(typeNode == null) {
            throw new Error(`${dataNode} Does Not Exist In configure.json!`);
        }

        const type = typeNode.type;

        if(type == null) {
            throw new Error(`There is no TYPE defined for data node ${dataNode}!`);
        }

        return [type, dataNode];
    }

}

module.exports = Shock;