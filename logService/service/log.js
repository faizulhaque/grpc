const logModel = require('../model/log');
const auth = require('./../../ssoService/client');

function logService() {
}

logService.prototype.saveLog = (request) => {
    return auth.authorize(request).then((response) => {
        return new Promise((resolve, reject) => {
            var logMessage = new logModel({
                serviceName: request.serviceName,
                logMessage: request.logMessage,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logMessage.save((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve(logMessage);
            });
        });
    }).catch((error) => {
        return reject(error);
    });
};


module.exports = logService;