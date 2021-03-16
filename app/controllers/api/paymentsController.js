const stripe = require("../../../config/stripe");
const response = require("../../helpers/response");

/**
 * Método para listar tarjetas de un usuario
 */
const getCards = async(req, res = response, next) => {
	try {
		const customerId = req.header('customer-id')
		const cards = await stripe.customers.listSources(
			`${customerId}`,
			{object: 'card', limit: 10}
		);
		// response(res, 200, `Tarjetas cargadas`,cards);
		res.json(cards);
	} catch (error) {
		console.log(`Error: ${error}`);
		response(res, 500, `Error: ${error}`, null);
	}
}

/**
 * Método para crear una tarjeta(método de pago) de un usuario en Stripe
 */
const createCard = async(req, res, next) => {
	try {
			// const {customerId, number, exp_month, exp_year, cvc} = req.body;
			const {customerId, tokenId} = req.body;

			// response(res, 200, `Se recibió ${customerId} y ${tokenId}`, null);

			// const token = await stripe.tokens.create({
			// 	card: {
			// 		number: number,
			// 		exp_month: exp_month,
			// 		exp_year: exp_year,
			// 		cvc: cvc,
			// 	},
			// });

			const card = await stripe.customers.createSource(
				customerId, {source: tokenId}
			);
			console.log(card);
			response(res, 200, "Tarjeta creada satisfactoriamente.", card);
	} catch (error) {
		response(res, 500, `Error: ${error}`, null);
	}
}

/**
 * Método para crear un customer(cliente) en Stripe
 */
const createCustomer = async(req, res, next) => {
	try {
		const {email, description} = req.body;
		const customer = await stripe.customers.create({
			email: email,
			description: description
		});
		response(res, 200, "Cliente creado satisfactoriamente.", customer.data.id);
	} catch (e) {
		response(res, 500, `Error: ${error}`, null);
	}
}

/**
 * Método para realizar pagos
 */

 const makePayment = async(req, res, next) => {
	try {
		const {amount, currency} = req.body;

	} catch (error) {
		response(res, 500, `Error: ${error}`, null);
	}
 }

/**
 * Método para listar pagos
 */

 const getPayouts = async(req, res, next) => {
	try {
		const {amount, currency} = req.body;
		const payouts = await stripe.payouts.list({
			limit: 3,
		});

		response(res, 200, "Pagos cargados correctamente.", payouts);
	} catch (error) {
		response(res, 500, `Error: ${error}`, null);
	}
 }


module.exports = {
	getCards,
	createCard,
	createCustomer,
	makePayment,
	getPayouts
}
