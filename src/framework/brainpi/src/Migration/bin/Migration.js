var init = require("../../Config/init");
var fs   = require("fs");
var config  = require("../../../../../../src/config/index");

class Migration {

    migrate() {

        var files = [];

        fs.readdirSync("./src/migrations").forEach(file => {

            file = file.substring(0, file.length - 3);

            var migration   = require("../../../../../migrations/"+file),
                schema      = this.load(migration),
                typeAndNode = this.connector(migration);

            switch(typeAndNode[0]) {
                case "MySQL":
                    config.load(typeAndNode[1]).query(schema).then(results => {
                        console.log(results);
                    });
                    break;

                default:
                    console.log(`ERROR: ${typeAndNode[0]} is not a valid Data Type!`);
                    process.exit(1);
            }
        })

        console.log("Migrations Made!");
        process.exit();
    }

    load(migrator) {
        
        const schema = migrator.up();

        return this.queryTemplator(schema);
    }

    connector(migrator) {
        
        var prop                = migrator.props();
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

    queryTemplator( schemadata ) {

        var x      = 0,
            Query  = `CREATE TABLE ${schemadata.tableQuery} (`,
            schema = schemadata.columnsQuery;

        while(x < schema.length) {

            if(schema[x]['name'] != null) {
                Query += ` ${schema[x]['name']} `;
            } else {
                console.log(`ERROR: Column Needs A Name!`);
                process.exit(1);
            }

            if(schema[x]['type'] != null) {
                var type;

                switch(schema[x]['type']) {
                    case "string":
                        type = "varchar";
                        break;
                    case "integer":
                        type = "int";
                        break;
                    case "datetime":
                        type = "datetime";
                        break;
                    default:
                        console.log(`ERROR: Unrecognized Type ${schema[x]['type']}`);
                        process.exit(1);
                        break;
                }

                Query += ` ${type}`;
            } else {
                //ERROR
            }

            if(schema[x]['max'] != null && typeof schema[x]['max'] == 'number') {
                Query += `(${schema[x]['max']})`;
            }

            if(schema[x]['null'] != null) {
                if(!schema[x]['null']) {
                    Query += ` NOT NULL`;
                }
            }

            if(schema[x]['primary'] != null && schema[x]['primary']) {
                Query += ` PRIMARY KEY`;
            }

            if(schema[x]['unique'] != null && schema[x]['unique']) {
                Query += ` UNIQUE KEY`;
            }

            if(schema[x]['default'] != null) {
                Query += ` DEFAULT ${schema[x]['default']}`;
            }

            if(x != schema.length - 1)
                Query += `, `;

            x++;
        }

        Query += `);`;

        return Query;

    }

}

module.exports = new Migration();