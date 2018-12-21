var Controller      = require("./Controller");
const UserClass     = require("../models/User");
const PersonalClass = require("../models/Personal");

class DemoController extends Controller {

    index(request, response) {
        var User;
        var PersonalInfo;

        UserClass.first().then(data => {
            User = data[0];

            User.personal().then(data => {
                PersonalInfo = data[0];

                response.render("index", { personal: PersonalInfo })

            });

        })

        
    }

}

module.exports = new DemoController();