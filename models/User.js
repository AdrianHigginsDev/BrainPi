const { Model } = require("brainpi");

class User extends Model {

    constructor() {
        super();
        this.id         = null;
        this.name       = null;
        this.email      = null;
        this.created_at = null;
    }

    static fields() {
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

}

module.exports = User;