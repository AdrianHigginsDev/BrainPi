const { Controller } = require('brainpi'); 

class HomeController extends Controller
{
    constructor()
    {
        super();
    }

    index(request, response)
    {
        // TO-DO
    }

}

module.exports = new HomeController();