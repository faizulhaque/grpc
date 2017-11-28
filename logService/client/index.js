const grpc = require('grpc');

const configPath = require('path').resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({ root: protoPath, file: 'log_service.proto' });

const hostPort = config.logService.host + ':' + config.logService.port;
//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.microservice.LogService(hostPort, grpc.credentials.createInsecure());

function addLog(logObject) {
  return new Promise((resolve, reject) => {
    client.saveLog(logObject, (error, response) => {
      if (error || response.meta.code < 200 || response.meta.code >= 300) {
        return reject(error || response);
      }
      return resolve(response);
    });
  });
}

module.exports.addLog = addLog;
