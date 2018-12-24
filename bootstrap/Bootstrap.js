class Bootstrap {

    static templateEngine() {
        return {
            usingEngine: true,
            name:        'pug'
        }
    }

    static viewDirectory() {
        return {
            path: 'src/views'
        }
    }

}

module.exports = Bootstrap;