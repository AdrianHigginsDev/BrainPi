const { Model } = require("brainpi");

class PersonalInformation extends Model {

    constructor() {
        super();
        this.id          = null;
        this.firstname   = null;
        this.lastname    = null;
        this.email       = null;
        this.user_id     = null;
        this.created_at  = null;
    }

    fields() {
        return {
            id:         "id",
            firstname:  "string",
            lastname:   "string",
            email:      "string",
            user_id:    "id",
            created_at: "timestamp"
        }
    }

    static props() {
        return {
            data: 'mysql_example'
        }
    }

    user() {
        const User = require("./User");

        return this.belongsToMany(User);
    }

}

module.exports = PersonalInformation;