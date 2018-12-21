const Model = require("./Model");

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