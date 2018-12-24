class Bootstrap {

    static templateEngine() {
        return {
            usingEngine: true,
            name:        'pug'
        }
    }

    static viewDirectory() {
        return {
            path: 'views'
        }
    }

    static modelDirectory() {
        return {
            path: 'models'
        }
    }

    static controllerDirectory() {
        return {
            path: 'app/controllers'
        }
    }

}

module.exports = Bootstrap;