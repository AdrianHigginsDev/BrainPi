class MySql {

    constructor( connection,host,port,database,username,password ) {
        this.connection = connection;
        this.host       = host;
        this.port       = port;
        this.database   = database;
        this.username   = username;
        this.password   = password;
    }

    init() {

    }

    verify() {
        this.connection === 'mysql' ? true : false;
    }
}

module.exports = MySql;