const { Controller } = require('brainpi'); 

class HomeController extends Controller
{
    constructor()
    {
        super();
    }

    index(request, response) {
        response.render('index')
    }

    home(request, response) {
        response.render('home/home');
    }

}

module.exports = new HomeController();