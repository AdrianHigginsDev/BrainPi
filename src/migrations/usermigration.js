var Schema = require("../framework/brainpi/src/Migration/src/Schema");

class UserMigraton {

    constructor() {
        // super();
    }

    props() {
        return {
            data: 'dataNodeOne'
        }
    }

    up() {
        Schema.table("UsersTest")
            .column(
                {
                    name: 'name',
                    type: 'string',
                    max:  256,
                    primary: false,
                    unique: false,
                    null: false,
                    default: null
                }
            )
            .column(
                {
                    name: 'email',
                    type: 'string',
                    max:  256,
                    primary: false,
                    unique: true,
                    null: false,
                    default: null
                }
            )

        return Schema;
    }

}

module.exports = new UserMigraton();