const { Schema } = require("brainpi");

class UsersMigraton extends Schema {

    constructor() {
        super();
    }

    /*

                    name            : 'id',
                    type            : 'integer',
                    max             : 11,
                    primary         : true,
                    unique          : false,
                    nullable        : false,
                    default         : null,
                    auto_increments : true,
                    unsigned        : true

    */


    props() {
        return {
            data: 'mysql_example'
        }
    }

    up() {
        this.table("userstest")
            .column(
                {
                    name: 'id',
                    type: 'integer',
                    max:  11,
                    primary: true,
                    unique: true,
                    nullable: false,
                    default: null,
                    auto_increments: true
                }
            )
            .column(
                {
                    name: 'name',
                    type: 'string',
                    max:  255
                }
            )
            .column(
                {
                    name: 'email',
                    type: 'string',
                    max:  255,
                    unique: true
                }
            )
            .column(
                {
                    name: 'password',
                    type: 'string',
                    max:  255
                }
            )
            .column(
                {
                    name: 'created_at',
                    type: 'datetime'
                }
            )
            .column(
                {
                    name: 'updated_at',
                    type: 'datetime'
                }
            )

        return this;
    }

}

module.exports = new UsersMigraton();