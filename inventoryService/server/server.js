
const grpc = require('grpc');
const path = require('path');
const _ = require('lodash');

const configPath = path.resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = path.resolve(__dirname, './../../proto/inventory_service.proto');
const proto = grpc.load(protoPath);
let server = new grpc.Server();
const inventoryService = require('../service/inventory');

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.microservice.InventoryService.service, {
    getItems(call, callback) {
        console.log('call.getItems.request', call.request);
        let responseFormat = {
            meta: {
                code: 200,
                total: 0
            },
            data: {
                items: [],
                message_value: ''
            }
        };
        new inventoryService().getItems(call.request).then((response) => {
            console.log('response', response)
            responseFormat.data.items = _.map(response.items, (item) => {
                return  {
                    id: item._id.toString(),
                    name: item.name,
                    price: item.price
                }
            });
            responseFormat.meta.total = response.count;
            callback(null, responseFormat);
        }).catch((e) => {
            responseFormat.meta.code = 400;
            responseFormat.data.message_value = e.message;
            callback(null, responseFormat);
        });
    },
    getItemById(call, callback) {
        console.log('call.getItems.request', call.request);
        let responseFormat = {
            meta: {
                code: 200
            },
            data: {
                items: [],
                message_value: ''
            }
        };
        new inventoryService().getItemById(call.request).then((response) => {
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
mongoose.connect(config.inventoryService.mongoose.url);

const hostPort = config.inventoryService.host + ':' + config.inventoryService.port;
//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind(hostPort, grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', hostPort);