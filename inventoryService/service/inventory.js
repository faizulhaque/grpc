const itemModel = require('../model/item');
const auth = require('./../../ssoService/client');

function inventoryService() {
}

inventoryService.prototype.getItems = (request) => {
    return auth.authorize(request).then((response) => {
        return new Promise((resolve, reject) => {
            itemModel.find()
                .select()
                .limit(request.pageSize)
                .skip((request.pageNo - 1) * request.pageSize)
                .sort({
                    name: 'asc'
                })
                .exec(function (err, items) {
                    if (err) {
                        return reject(err);
                    }
                    itemModel.count().exec(function (err, count) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve({
                            items: items,
                            count: count
                        })
                    })
                });
        });
    });
};

inventoryService.prototype.getItemById = (request) => {
    return auth.authorize(request).then((response) => {
        return new Promise((resolve, reject) => {
            itemModel.find({
                _id: request.id
            }, (err, response) => {
                if (err) {
                    return reject(err);
                }
                if (!response.length) {
                    return reject(new Error('Not found.'));
                }
                return resolve(response);
            });
        });
    });
};


module.exports = inventoryService;