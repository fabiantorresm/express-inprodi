const { response } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../../models/user');
const { generateJWT } = require('../../helpers/jwt');
const stripe = require("../../../config/stripe");
const { validateIdTokenGoogle } = require('../../middlewares/validateIdtokenGoogle');

const getUsers = async(req, res = response)=> {
	try {
		const users = await User.find({}).populate('user','name');
		res.json({
			ok: true,
			users
		});
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'No se pudo recuperar la información solicitada'
		});
	}
}

const createUser = async(req, res = response ) => {

	const { email, password, platform } = req.body;
	try {
		let user = await User.findOne({ email });
		if ( user ) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe, intente con otro correo por favor.'
			});
		}

		const customer = await stripe.customers.create({
			email: email,
			description: `Usuario: ${email}`
		});

		user = new User( req.body );

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync( password, salt );
		user.customerId = customer.id
		user.platform = platform

		await user.save();

		// Generar JWT
		const token = await generateJWT( user.id, user.name );
	
		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			email: user.email,
			// customer_id: user.customerId,
			token
		})
		
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'No se pudo crear el usuario'
		});
	}
}

const sessionUser = async(req, res = response ) => {
	console.log(req.body[0]);
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if ( !user ) {
			return res.status(400).json({
				ok: false,
				msg: `El usuario no existe con ese email: ${email}`
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
		// res.json({
		//     ok: true,
		//     uid: user.id,
		//     name: user.name,
		//     token
		// })
		res.json({token});
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

const googleAuth = async(req, res) => {
	const token = req.body.token;
	if (!token) {
		return res.json({ok: false, message: 'No se recibieron los datos necesarios.'});
	}
	const user = await validateIdTokenGoogle(token);
	if (!user) {
		return res.json({ok: false, message: 'No se encontró un usuario.'});
	}

	res.json({
		message: 'Estás en Google',
		user
	});
}

module.exports = { getUsers, createUser, sessionUser, refreshToken, googleAuth }