const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../app/middlewares/validateFields');
const { getTodos, createTodo } = require('../app/controllers/api/todosController');
const { validateJwt } = require('../app/middlewares/validateJwt');

const router = Router();
router.use( validateJwt );

router.get(
  '/',
  getTodos
);

router.post(
  '/new', 
  [ // middlewares
    check('text', 'El text es obligatorio').not().isEmpty(),
    // check('user', 'El user es obligatorio').not().isEmpty(),
    validateFields
  ],
  createTodo
);


module.exports = router;