function config() {
    return {
        logService: {
            host: '0.0.0.0',
            port: '500050',
            mongoose: {
                url: 'mongodb://localhost/microservice_log'
            }
        },
        ssoService: {
            host: '0.0.0.0',
            port: '500051',
            mongoose: {
                url: 'mongodb://localhost/microservice_sso'
            }
        },
        inventoryService: {
            host: '0.0.0.0',
            port: '500052',
            mongoose: {
                url: 'mongodb://localhost/microservice_inventory'
            }
        }
    }
}
module.exports.config = config;