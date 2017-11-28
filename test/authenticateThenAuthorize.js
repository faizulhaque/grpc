const authClient = require('./../ssoService/client');

const authObject = {
    username: 'client',
    password: 'client'
};

authClient.authenticate(authObject).then((authenticateResponse) => {
    console.log('success:authenticate', authenticateResponse);
    authClient.authorize({token: authenticateResponse.data[authenticateResponse.data.token]}).then((authorizeResponse) => {
        console.log('success:authorize', authorizeResponse);
    }).catch((authorizeError) => {
        console.log('faild:authorize', authorizeError);
    });
}).catch((authenticateError) => {
    console.log('faild:authenticate', authenticateError);
});