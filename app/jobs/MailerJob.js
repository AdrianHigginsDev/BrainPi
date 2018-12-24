const { Job } = require("brainpi");

class MailerJob extends Job {

    constructor() {
        super();
    }

    config() {
        return {
            timepattern: this.everySecond()
        }
    }

    task() {

       console.log("hiii")


    }

}

module.exports = new MailerJob();