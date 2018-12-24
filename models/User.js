const { Model } = require("brainpi");

class User extends Model {

    constructor() {
        super();
    }

    static props() {
        return {
            data: 'dataNodeOne'
        }
    }

}

module.exports = User;