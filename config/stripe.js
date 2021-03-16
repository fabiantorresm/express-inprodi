// const Stripe_Key = 'sk_test_....jQb';
// const stripe = require("stripe")(Stripe_Key);


const Stripe = require('stripe');
const stripe = Stripe(process.env.KEY_SECRET_STRIPE);



module.exports = stripe;