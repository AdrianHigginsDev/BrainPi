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

    static routesDirectoryHttp() {
        return {
            path: 'routes/http'
        }
    }

    static routesDirectoryApi() {
        return {
            path: 'routes/api'
        }
    }

    static migrationsDirectory() {
        return {
            path: 'migrations'
        }
    }

    static storageDirectory() {
        return {
            path: 'storage'
        }
    }

    static jobDirectory() {
        return {
            path: 'app/jobs'
        }
    }

}

module.exports = Bootstrap;