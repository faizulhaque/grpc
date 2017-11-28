const grpc = require('grpc');

const configPath = require('path').resolve(__dirname, './../../config');
const config = require(configPath).config();
const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({ root: protoPath, file: 'inventory_service.proto' });

const hostPort = config.inventoryService.host + ':' + config.inventoryService.port;
//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.microservice.InventoryService(hostPort, grpc.credentials.createInsecure());

function getItems(searchObject) {
  return new Promise((resolve, reject) => {
    client.getItems(searchObject, (error, response) => {
      if (error || response.meta.code < 200 || response.meta.code >= 300) {
        return reject(error || response);
      }
      return resolve(response);
    });
  });
}

function getItemById(idObject) {
  return new Promise((resolve, reject) => {
    client.getItemById(idObject, (error, response) => {
      if (error || response.meta.code < 200 || response.meta.code >= 300) {
        return reject(error || response);
      }
      return resolve(response);
    });
  });
}

module.exports.getItems = getItems;
module.exports.getItemById = getItemById;
