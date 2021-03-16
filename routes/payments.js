const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../app/middlewares/validateFields');
const { getCards, createCard, createCustomer, makePayment, getPayouts } = require('../app/controllers/api/paymentsController');
const { validateJwt } = require('../app/middlewares/validateJwt');

const router = Router();

router.get("/customers/cards", validateJwt, getCards);
router.get("/payouts", validateJwt, getPayouts);
router.post("/customers/cards/new", createCard);
router.post("/customers/cards", createCustomer);
router.post("/customers/payment", makePayment);

module.exports = router;