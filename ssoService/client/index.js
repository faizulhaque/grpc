const grpc = require('grpc');

const configPath = require('path').resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({ root: protoPath, file: 'sso_service.proto' });

const hostPort = config.ssoService.host + ':' + config.ssoService.port;
//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.microservice.SSOService(hostPort, grpc.credentials.createInsecure());

function authenticate(authObject) {
  return new Promise((resolve, reject) => {
    client.authenticate(authObject, (error, response) => {
      if (error || response.meta.code < 200 || response.meta.code >= 300) {
        return reject(error || response);
      }
      return resolve(response);
    });
  });
}

function authorize(tokenObject) {
  return new Promise((resolve, reject) => {
    client.authorize(tokenObject.token, (error, response) => {
      if (error || response.meta.code < 200 || response.meta.code >= 300) {
        return reject(error || response);
      }
      return resolve(response);
    });
  });
}

module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
