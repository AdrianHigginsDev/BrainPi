var Build = require("./src/build");

class QueryBuilder {

    constructor() {
        this.tableQuery   = null;
        this.method       = null;
        this.queryRaw     = null;
        this.limitQuery   = null;
        this.offsetQuery  = null;
        this.finalQuery   = [];
        this.orderByQuery = [];
        this.params       = [];
        this.values       = [];
        this.clause       = [];
    }

    table(tableQuery) {
        if(this.tableQuery !== null) {
            console.log(`ERROR: QueryBuilder Table Already Defined!`);
            console.log(`You Tried To Call Table ${tableQuery} after already defining ${this.tableQuery}!`);
            process.exit(1);
        }
        if(tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        this.tableQuery = tableQuery;
        return this;
    }

    select(params) {
        if(this.method !== null) {
            console.log(`ERROR: QueryBuilder Method Already Set, CANNOT change once already set!`);
            console.log(`You Tried To Call 'SELECT' After Already Defining Query Type!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        this.params = params;
        this.method = "select";
        return this;
    }

    count() {
        if(this.method !== null) {
            console.log(`ERROR: QueryBuilder Method Already Set, CANNOT change once already set!`);
            console.log(`You Tried To Call 'COUNT()' After Already Defining Query Type!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        this.method = "count";
        return this;
    }

    insert(params) {
        if(this.method !== null) {
            console.log(`ERROR: QueryBuilder Method Already Set, CANNOT change once already set!`);
            console.log(`You Tried To Call 'INSERT' After Already Defining Query Type!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        this.params = params;
        this.method = "insert";
        return this;
    }

    remove() {
        if(this.method !== null) {
            console.log(`ERROR: QueryBuilder Method Already Set, CANNOT change once already set!`);
            console.log(`You Tried To Call 'INSERT' After Already Defining Query Type!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        this.method = "delete";
        return this;
    }

    update(params) {
        if(this.method !== null) {
            console.log(`ERROR: QueryBuilder Method Already Set, CANNOT change once already set!`);
            console.log(`You Tried To Call 'INSERT' After Already Defining Query Type!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }

        this.params = params;
        this.method = "update";
        return this;
    }

    where(fieldOne, operation, fieldTwo) {
        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Use WHERE clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }

        if(fieldOne === null || operation === null || fieldTwo === null) {
            console.log(`ERROR: NO NULL ALLOWED IN WHERE CLAUSE!`);
            console.log(`All Params Required In Where Clause!`);
            process.exit(1);
        }

        if(typeof fieldTwo != 'number') {
            this.clause.push( `${fieldOne} ${operation} '${fieldTwo}'`);
        } else {
            this.clause.push( `${fieldOne} ${operation} ${fieldTwo}`);
        }
        
        return this;
    }

    limit(limit) {
        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Use LIMIT without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }

        this.limitQuery = limit;
        return this;
    }

    offset(offset) {
        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Use OFFSET clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }

        this.offsetQuery = offset;
        return this;
    }

    orderBy(field, ascOrDesc) {
        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Use ORDERBY clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        if(this.orderByQuery.length > 0) {
            console.log(`ERROR: Order Has Been Set!`);
            console.log(`You Cannot Call Order By More Than Once!`);
            process.exit(1);
        }

        this.orderByQuery[0] = field;
        this.orderByQuery[1] = ascOrDesc;

        return this;
    }

    withValues(values) {
        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Use ORDERBY clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }
        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }
        if(this.values.length > 0) {
            console.log(`ERROR: Values Already Defined!`);
            console.log(`You Cannot Re-Define Values!`);
            process.exit(1);
        }
        this.values = values;
        return this;
    }

    execute() {

        if(this.method === null) {
            console.log(`ERROR: Method Has Not Been Set!`);
            console.log(`You Cannot Execute Query Without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
            process.exit(1);
        }

        if(this.tableQuery === null) {
            console.log(`ERROR: NO TABLE DEFINED!`);
            console.log(`You Cannot Query Build Without Defining A Table!`);
            process.exit(1);
        }

        switch(this.method) {
            case "insert":
                if(this.params.length !==  this.values.length) {
                    console.log(`ERROR: VALUE LENGTH AND PARAMETER LENGTH DO NOT MATCH!`);
                    console.log(`You passed in ${this.params.length} parameters and ${this.values.length} values!`);
                    process.exit(1);
                }
                this.queryRaw = Build.buildInsert(this.tableQuery, this.params);
                break;

            case "select":
                this.queryRaw = Build.buildSelect(this.tableQuery, this.params, this.clause, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "update":
                if(this.params.length !==  this.values.length) {
                    console.log(`ERROR: VALUE LENGTH AND PARAMETER LENGTH DO NOT MATCH!`);
                    console.log(`You passed in ${this.params.length} parameters and ${this.values.length} values!`);
                    process.exit(1);
                }
                this.queryRaw = Build.buildUpdate(this.tableQuery, this.params, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "delete":
                this.queryRaw = Build.buildDelete(this.tableQuery, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "count":
                this.queryRaw = Build.buildCount(this.tableQuery, this.params, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            default:
                console.log(`ERROR: Unknown Method Set!`);
                console.log(`Please Check Your Code!`);
                process.exit(1);
                break;

        }

        this.finalQuery[0] = this.queryRaw;
        this.finalQuery[1] = this.values;

        return this.query(this.finalQuery[0],this.finalQuery[1]);
        // return this.finalQuery;

    }

    query() {
        console.log("didnt work");
    }
}

module.exports = QueryBuilder;