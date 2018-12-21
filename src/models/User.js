const Model    = require("./Model");

class User extends Model {

    constructor() {
        super();
    }

    static props() {
        return {
            data: 'dataNodeOne'
        }
    }

    personal() {
        var Personal = require("./Personal");
        return this.belongsTo( Personal );
    }


}

module.exports = User;