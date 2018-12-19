class Build {

    constructor() {
        this.query = null;
    }

    buildInsert(table, params) {
        var x              = 0;

        // QUERY TABLE
        this.query = `INSERT INTO ${table} (`;

        // EACH COLUMN
        while (x < params.length) {
            if(x != params.length - 1) 
                this.query += `${params[x]}, `;
            else
                this.query += `${params[x]}`;

            x++;
        }

        // QUERY 
        this.query += `) VALUES (`;

        // RESET X
        x = 0;

        // ADD ? FOR EACH PARAM
        while (x < params.length) {
            if(x != params.length - 1) 
                this.query += `?, `;
            else
                this.query += `?`;

            x++;
        }

        // QUERY END
        this.query += `);`;

        return this.query.replace("  ", " ");
    }

    buildSelect(table, params, clauses, limit, offset, orderBy) {
        var x              = 0;

        // QUERY METHOD
        this.query = `SELECT `;

        // WHAT ARE WE SELECTING ?
        while (x < params.length) {
            if(x != params.length - 1) 
                this.query += `${params[x]}, `;
            else
                this.query += `${params[x]}`;

            x++;
        }
        // FROM TABLE
        this.query += ` FROM ${table} WHERE 1 = 1 `;

        x = 0;
        if(clauses != null) {
            while(x < clauses.length) {
                this.query += ` AND ${clauses[x]} `;
                x++;
            }
        }

        if(orderBy != null && orderBy.length > 0) {
            console.log(orderBy);
            if(typeof orderBy[0] != 'string') {
                console.log(`ERROR: FIRST PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(typeof orderBy[1] != 'string') {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(orderBy[1] != "ASC" && orderBy[1] != "DESC") {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE ("ASC" OR "DESC")!`);
                process.exit(1);
            }
            this.query += ` ORDER BY ${orderBy[0]} ${orderBy[1]} `;
        }

        if(limit != null) {
            if(typeof limit != 'number') {
                console.log(`ERROR: LIMIT MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` LIMIT ${limit} `;
        }

        if(offset != null) {
            if(typeof offset != 'number') {
                console.log(`ERROR: OFFSET MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` OFFSET ${offset} `;
        }

        return this.query.replace("  ", " ");
    }

    buildUpdate(table, params, clauses, limit, offset, orderBy) {
        var x              = 0;

        console.log(limit);
        // QUERY TABLE
        this.query = `UPDATE ${table} SET `;

        // EACH COLUMN
        while (x < params.length) {
            if(x != params.length - 1) 
                this.query += `${params[x]} = ?, `;
            else
                this.query += `${params[x]} = ?`;

            x++;
        }

        this.query += ` WHERE 1 = 1 `;

        x = 0;
        if(clauses != null) {
            while(x < clauses.length) {
                this.query += ` AND ${clauses[x]} `;
                x++;
            }
        }

        if(orderBy != null && orderBy.length > 0) {
            if(typeof orderBy[0] != 'string') {
                console.log(`ERROR: FIRST PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(typeof orderBy[1] != 'string') {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(orderBy[1] != "ASC" && orderBy[1] != "DESC") {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE ("ASC" OR "DESC")!`);
                process.exit(1);
            }
            this.query += ` ORDER BY ${orderBy[0]} ${orderBy[1]}`;
        }

        if(limit != null) {
            if(typeof limit != 'number') {
                console.log(`ERROR: LIMIT MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` LIMIT ${limit}`;
        }

        if(offset != null) {
            if(typeof offset != 'number') {
                console.log(`ERROR: OFFSET MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` OFFSET ${offset}`;
        }

        return this.query.replace("  ", " ");

    }

    buildDelete(table, clauses, limit, offset, orderBy) {
        this.query = `DELETE FROM ${table} WHERE 1 = 1`;
        var x = 0;
        if(clauses != null) {
            while(x < clauses.length) {
                this.query += ` AND ${clauses[x]} `;
                x++;
            }
        }

        if(orderBy != null && orderBy.length > 0) {
            console.log(orderBy);
            if(typeof orderBy[0] != 'string') {
                console.log(`ERROR: FIRST PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(typeof orderBy[1] != 'string') {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(orderBy[1] != "ASC" && orderBy[1] != "DESC") {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE ("ASC" OR "DESC")!`);
                process.exit(1);
            }
            this.query += ` ORDER BY ${orderBy[0]} ${orderBy[1]} `;
        }

        if(limit != null) {
            if(typeof limit != 'number') {
                console.log(`ERROR: LIMIT MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` LIMIT ${limit} `;
        }

        if(offset != null) {
            if(typeof offset != 'number') {
                console.log(`ERROR: OFFSET MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` OFFSET ${offset} `;
        }

        return this.query.replace("  ", " ");
    }

    buildCount(table, params, clauses, limit, offset, orderBy) {

        var x              = 0;

        // QUERY METHOD
        this.query = `SELECT count(`;

        // WHAT ARE WE SELECTING ?
        while (x < params.length) {
            if(x != params.length - 1) 
                this.query += `${params[x]}, `;
            else
                this.query += `${params[x]}`;

            x++;
        }
        // FROM TABLE
        this.query += `) FROM ${table} WHERE 1 = 1 `;

        x = 0;
        if(clauses != null) {
            while(x < clauses.length) {
                this.query += ` AND ${clauses[x]} `;
                x++;
            }
        }

        if(orderBy != null && orderBy.length > 0) {
            console.log(orderBy);
            if(typeof orderBy[0] != 'string') {
                console.log(`ERROR: FIRST PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(typeof orderBy[1] != 'string') {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE A STRING!`);
                process.exit(1);
            }
            if(orderBy[1] != "ASC" && orderBy[1] != "DESC") {
                console.log(`ERROR: SECOND PARAM OF ORDERBY MUST BE ("ASC" OR "DESC")!`);
                process.exit(1);
            }
            this.query += ` ORDER BY ${orderBy[0]} ${orderBy[1]} `;
        }

        if(limit != null) {
            if(typeof limit != 'number') {
                console.log(`ERROR: LIMIT MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` LIMIT ${limit} `;
        }

        if(offset != null) {
            if(typeof offset != 'number') {
                console.log(`ERROR: OFFSET MUST BE NUMERIC!`);
                process.exit(1);
            }
            this.query += ` OFFSET ${offset} `;
        }

        return this.query.replace("  ", " ");
    }

}

module.exports = new Build();