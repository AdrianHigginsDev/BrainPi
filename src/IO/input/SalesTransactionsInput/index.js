var brainpi  = require("../../../config/index");

class SalesTransactionsInput {

    // csvTest(req,res) {
    //     brainpi.load("dataNodeTwo").open('11311').then(contents => {
    //         console.log(contents)
    //         return res.send(contents);
    //     });
    // }

    mysqlTest(req,res) {
        console.log("hi");
        console.log(req.body);

        res.send("crap");

    }
}

module.exports = new SalesTransactionsInput();