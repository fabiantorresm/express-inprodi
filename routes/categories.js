const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../app/middlewares/validateFields');
const { getCategories, createCategory } = require('../app/controllers/api/categoriesController');
const { validateJwt } = require('../app/middlewares/validateJwt');

const router = Router();
// router.use( validateJwt );

router.get('/', getCategories);

router.post(
  '/new', 
  [ // middlewares
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El user es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCategory
);

module.exports = router;