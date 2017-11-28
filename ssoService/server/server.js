
const grpc = require('grpc');
const path = require('path');

const configPath = path.resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = path.resolve(__dirname, './../../proto/sso_service.proto');
const proto = grpc.load(protoPath);
let server = new grpc.Server();
const ssoService = require('../service/sso');

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.microservice.SSOService.service, {
    authenticate(call, callback) {
        console.log('call.authenticate.request', call.request);
        let responseFormat = {
            meta: {
                code: 200
            },
            data: {
                message_value: '',
                token_value: ''
            }
        };
        new ssoService().authenticate(call.request).then((response) => {
            responseFormat.data.message = '';
            responseFormat.data.token_value = response;
            callback(null, responseFormat);
        }).catch((e) => {
            responseFormat.meta.code = 400;
            responseFormat.data.message_value = e.message;
            callback(null, responseFormat);
        });
    },
    authorize(call, callback) {
        console.log('call.authorize.request', call.request);
        let responseFormat = {
            meta: {
                code: 200
            },
            data: {
                message_value: '',
                token_value: ''
            }
        };
        new ssoService().authorize(call.request).then((response) => {
            responseFormat.data.message_value = 'Success';
            callback(null, responseFormat);
        }).catch((e) => {
            responseFormat.meta.code = 400;
            responseFormat.data.message_value = e.message;
            callback(null, responseFormat);
        });

    }
});

var mongoose = require('mongoose');
mongoose.connect(config.ssoService.mongoose.url);

const hostPort = config.ssoService.host + ':' + config.ssoService.port;
//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind(hostPort, grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', hostPort);