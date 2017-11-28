
const grpc = require('grpc');
const path = require('path');

const configPath = path.resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = path.resolve(__dirname, './../../proto/log_service.proto');
const proto = grpc.load(protoPath);
let server = new grpc.Server();
const logService = require('../service/log');

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.microservice.LogService.service, {
  saveLog(call, callback) {
    console.log('call.saveLog.request', call.request);
    let responseFormat = {
      meta: {
        code: 200
      },
      data: {
        message: ''
      }
    };
    new logService().saveLog(call.request).then((response) => {
      responseFormat.data.message = JSON.stringify(response);
      callback(null, responseFormat);
    }).catch((e) => {
      responseFormat.meta.code = 400;
      responseFormat.data.message = JSON.stringify(e);
      callback(null, responseFormat);
    });
  }
});

var mongoose = require('mongoose');
mongoose.connect(config.logService.mongoose.url);

const hostPort = config.logService.host + ':' + config.logService.port;
//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind(hostPort, grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', hostPort);