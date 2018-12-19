class Migration {

    constructor() {

    }

    migrate() {
        /*
            get each class and file
        */

        var usermigraton = require("../../../../../migrations/usermigration");

        const schema = this.load(usermigraton);

        console.log(schema);
    }

    load(migrator) {
        
        const schema = migrator.up();

        return this.queryTemplator(schema);
    }

    queryTemplator( schemadata ) {
        var x = 0;

        var Query = `CREATE TABLE ${schemadata.tableQuery} (`

        var schema = schemadata.columnsQuery;
        while(x < schema.length) {

            if(schema[x]['name'] != null) {
                Query += ` ${schema[x]['name']} `;
            } else {
                //ERROR
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
                    default:
                        //ERROR
                        break;
                }

                Query += ` ${type}`;
            } else {
                //ERROR
            }

            if(schema[x]['max'] !== null && typeof schema[x]['max'] == 'number') {
                Query += `(${schema[x]['max']})`;
            } else {
                Query += `(256)`;
            }

            if(schema[x]['null'] !== null) {
                if(!schema[x]['null']) {
                    Query += ` NOT NULL`;
                }
            }

            if(schema[x]['primary'] !== null) {
                Query += ` PRIMARY KEY`;
            }

            if(schema[x]['unique'] !== null) {
                Query += ` UNIQUE KEY`;
            }

            if(schema[x]['default'] !== null) {
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

const migration = new Migration();

migration.migrate();