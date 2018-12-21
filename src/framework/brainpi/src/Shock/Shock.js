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

    static connector() {
        var prop                = this.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);

        if(typeNode == null) {
        console.log(`ERROR: ${dataNode} Does Not Exist In configure.json!`);
        process.exit(1);
        }

        const type = typeNode.type;

        if(type == null) {
            console.log(`ERROR: There is no TYPE defined for data node ${dataNode}!`);
            process.exit(1);
        }

        return [type, dataNode];
    }

}

module.exports = Shock;