const accountLookupModel = require('../model/accountLookup');
const tokenLookupModel = require('../model/tokenLookup');
const commonHelper = require('../helper/common');

function ssoService(){
}

ssoService.prototype.authenticate = (request) => {
    return new Promise((resolve, reject) => {
        accountLookupModel.find({
            username: request.username,
            password: request.password
        }, (err, user) => {
            console.log("user", user)
            if(err) {
                return reject(err);
            }
            if(!user.length) {
                return reject(new Error('Not found.'));
            }
            let token = {
                timestamp: new Date().getTime(),
                userId: user[0]._id
            };
            commonHelper.encrypt(JSON.stringify(token)).then((encryptedString) => {
                let tokenLookupModelObject = new tokenLookupModel({
                    token: encryptedString,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    accountLookupId: user[0]._id
                });
                tokenLookupModelObject.save((error) => {
                    console.log('error', error);
                    return resolve(tokenLookupModelObject.token);
                });
            });
        });
    });
};

ssoService.prototype.authorize = (request) => {
    return new Promise((resolve, reject) => {
        tokenLookupModel.find({
            token: request.token
        }, (err, response) => {
            if(err) {
                return reject(err);
            }
            if(!response.length) {
                return reject(new Error('Invalid Access Token.'));
            }
            return resolve(response);
        });
    });
};


module.exports = ssoService;