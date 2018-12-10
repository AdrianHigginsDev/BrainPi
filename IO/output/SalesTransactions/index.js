var config  = require("../../../config/index");

class SalesTransactions {

    index(req,res) {
        config.load("dataNodeTwo").open('11311').then(contents => {
            console.log(contents)
            return res.send(contents);
        });
        
    }
}

module.exports = new SalesTransactions();