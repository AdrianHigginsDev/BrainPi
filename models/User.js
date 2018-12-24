const { Model } = require("brainpi");

class User extends Model {

    constructor() {
        super();
        this.id    = null;
        this.name  = null;
        this.email = null;
    }

    static props() {
        return {
            data: 'mysql_example'
        }
    }

}

module.exports = User;