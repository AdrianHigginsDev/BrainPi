const Model = require("./Model");

class Personal extends Model {

    constructor() {
        super();
    }

    static props() {
        return {
            data: 'dataNodeOne'
        }
    }



}

module.exports = Personal;