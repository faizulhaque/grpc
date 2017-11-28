const authClient = require('./../ssoService/client');
const logClient = require('./../logService/client');

const authObject = {
    username: 'client',
    password: 'client'
};

let logObject = {
    serviceName: 'SSEO',
    logMessage: '',
    token: ''
}

authClient.authenticate(authObject).then((authResponse) => {
    console.log('success:authenticate', authResponse);
    logObject.token = authResponse.data[authResponse.data.token];
    logObject.logMessage = 'User Logged in.';
    logClient.addLog(logObject).then((logResponse) => {
        console.log('success:addLog', logResponse);
    }).catch((logError) => {
        console.log('faild:addLog', logError)
    });
}).catch((authError) => {
    console.log('faild:authenticate', authError)
});