const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const { generateJWT } = require('../../helpers/jwt');

const getUsers = async(req, res = response)=> {
    // try {
        const users = await User.find().populate('user','name');
        res.json({
            ok: true,
            users
        });
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'No se pudo recuperar la información solicitada'
    //     });
    // }
}

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe, intente con otro correo por favor.'
            });
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        // Generar JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const sessionUser = async(req, res = response ) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        const isPassword = bcrypt.compareSync( password, user.password );
        if ( !isPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generateJWT( user.id, user.name );
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const refreshToken = async (req, res = response ) => {
    const { uid, name } = req;
    const token = await generateJWT( uid, name );
    res.json({
        ok: true,
        token
    })
}

module.exports = { getUsers, createUser, sessionUser, refreshToken }