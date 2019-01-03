const { Migration, Table } = require("brainpi"); 

class TestsMigration extends Migration {

    constructor()
    {
        super();
    }

    static props() {
        return {
            data: ""
        }
    }

    up() {
        return this.Create('', function() {

            Table.incrementing("id").max(11).primary();

            return Table;
        })
    }
}

module.exports = new TestsMigration();