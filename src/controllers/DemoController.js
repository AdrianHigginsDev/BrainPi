var Controller = require("./Controller");
var UserClass  = require("../models/User");

class DemoController extends Controller {

    index(request, response) {
        var User;

        UserClass.last().then(data => {
            User = data[0];

            User.personal();

        })
    }

}

module.exports = new DemoController();