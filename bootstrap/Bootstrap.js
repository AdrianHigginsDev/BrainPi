class Bootstrap {


    /*========================================

        BOOTSTRAP CLASS

        * Class Used For Bootstrapping 
        * Directories
        * 
        * Allows Use To Quickly Find Different
        * File Types Or Change Around
        * Our Project Architecture

    =========================================*/


    /*========================================
       HTML Reference Source, We Use PUG
    =========================================*/

    static templateEngine() {
        return {
            usingEngine: true,
            name:        'pug'
        }
    }

    /*========================================
       Points To Where Our Views Are Stored
    =========================================*/

    static viewDirectory() {
        return {
            path: 'views'
        }
    }

    /*========================================
       Optional Error Views
    =========================================*/

    static errorViewDirectory() {
        return {
            path: 'errors'
        }
    }

    /*========================================
       Points To Where Our Models Are Stored
    =========================================*/

    static modelDirectory() {
        return {
            path: 'models'
        }
    }

    /*===========================================
       Points To Where Our Controllers Are Stored
    ============================================*/

    static controllerDirectory() {
        return {
            path: 'app/controllers'
        }
    }

    /*===========================================
       Points To Where Our HTTP Routes Are Stored
    ============================================*/

    static routesDirectoryHttp() {
        return {
            path: 'routes/http'
        }
    }

    /*==========================================
       Points To Where Our API Routes Are Stored
    ===========================================*/

    static routesDirectoryApi() {
        return {
            path: 'routes/api'
        }
    }

    /*==========================================
       Points To Where Our Migrations Are Stored
    ===========================================*/

    static migrationsDirectory() {
        return {
            path: 'migrations'
        }
    }

    /*========================================
       Points To Our Storage Directory
    =========================================*/

    static storageDirectory() {
        return {
            path: 'storage'
        }
    }

    /*========================================
       Points To Where Our Jobs Are Stored
    =========================================*/

    static jobDirectory() {
        return {
            path: 'app/jobs'
        }
    }

    /*==========================================
       Points To Where Our Middleware Are Stored
    ===========================================*/

    static middlewareDirectory() {
        return {
            path: 'app/controllers/middleware'
        }
    }

}

module.exports = Bootstrap;