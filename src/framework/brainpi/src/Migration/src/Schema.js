class Schema {

    constructor() {
        this.tableQuery   = null;
        this.columnsQuery = [];
    }

    table( table ) {
        if(this.tableQuery !== null) {
            console.log(`ERROR: Schema Table Already Defined!`);
            console.log(`You Tried To Call Table ${table} after already defining ${this.tableQuery}!`);
            process.exit(1);
        }
        this.tableQuery = table;

        return this;
    }

    column( column ) {
        if(column.length < 2) {
            console.log(`ERROR: Missing Column Properties!`);
            console.log(`Please check docs for how to declare a column!`);
            process.exit(1);
        }
        this.columnsQuery.push(column);
        return this;
    }

}

module.exports = new Schema();