const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID_WEB = process.env.CLIENT_ID_WEB;
const client = new OAuth2Client(CLIENT_ID_WEB);

const validateIdTokenGoogle = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                CLIENT_ID_WEB,
                process.env.CLIENT_ID_ANDROID
                ],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
            //const userid = payload['sub'];

            console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return payload
    } catch (error) {
        console.log(error);
        return null
    }
}


// verify().catch(console.error);

module.exports = {
    validateIdTokenGoogle
}