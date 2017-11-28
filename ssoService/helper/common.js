const crypto = require('crypto');

function decrypt(text) {
    return new Promise((resolve, reject) => {
        try {
            let decipher = crypto.createDecipher('aes-256-ctr', 'd6F3Efeq');
            let dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');
            dec = JSON.parse(dec);
            return resolve(dec);
        }
        catch (err) {
            return reject({ error: err });
        }
    });
}

function encrypt(text) {
    return new Promise((resolve) => {
        let cipher = crypto.createCipher('aes-256-ctr', 'd6F3Efeq');
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return resolve(crypted);
    });
}

module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
