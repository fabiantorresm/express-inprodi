const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = ( req, res = response, next ) => {   
    try {        
        // x-token headers
        // console.log(req.headers.authorization.split(' ')[1]);
        // const token = req.header('x-token');
        const token = req.headers.authorization.split(' ')[1];
    
        if ( !token ) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }
        const {uid, name} = jwt.verify(
            token,
            process.env.KEY_SECRET_JWT
        );
        req.uid = uid;
        req.name = name;
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    next();
}


module.exports = { validateJwt }
