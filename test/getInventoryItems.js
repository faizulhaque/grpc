const authClient = require('./../ssoService/client');
const inventoryClient = require('./../inventoryService/client');

const authObject = {
    username: 'client',
    password: 'client'
};

authClient.authenticate(authObject).then((authenticateResponse) => {
    console.log('success:authenticate', authenticateResponse);
    let pageObject = {
        pageNo: 1,
        pageSize: 10,
        token: authenticateResponse.data[authenticateResponse.data.token]
    };
    inventoryClient.getItems(pageObject).then((getItemsResponse) => {
        console.log('success:getItems', getItemsResponse);
    }).catch((getItemsError) => {
        console.log('faild:getItems', getItemsError)
    });
}).catch((authenticateError) => {
    console.log('faild:authenticate', authenticateError)
});