const { Model } = require("brainpi");

const PersonalInformation = require("./PersonalInformation");

class User extends Model {

    constructor() {
        super();
        this.id         = null;
        this.name       = null;
        this.email      = null;
        this.created_at = null;
    }

    fields() {
        return {
            id: "id",
            name: "string",
            email: "string",
            created_at: "timestamp"
        }
    }

    static props() {
        return {
            data: 'mysql_example'
        }
    }

    infos() {
        return this.hasOne(PersonalInformation)
    }

}

module.exports = User;