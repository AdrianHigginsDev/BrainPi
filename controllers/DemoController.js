const { Controller }     = require("brainpi");
const UserClass          = require("../models/User");

class DemoController extends Controller {

    index(request, response) {
        var User;

        UserClass.first().then(data => {
            User = data[0];
            response.render("index", { personal: User });
        })
    }
}

module.exports = new DemoController();