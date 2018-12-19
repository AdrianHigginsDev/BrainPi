var brainpi  = require("../../../config/index");

class SalesTransactions {

    csvTest(req,res) {
        brainpi.load("dataNodeTwo").open('11311').then(contents => {
            console.log(contents)
            return res.send(contents);
        });
    }

    mysqlTest(req,res) {
        brainpi.load("dataNodeOne").query("Select * from users").then(contents => {
            console.log(contents)
            return res.send(contents)
        });
    }
}

module.exports = new SalesTransactions();