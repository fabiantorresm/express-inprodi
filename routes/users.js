const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../app/middlewares/validateFields');
const { getUsers, createUser, sessionUser, refreshToken, googleAuth } = require('../app/controllers/api/usersController');
const { validateJwt } = require('../app/middlewares/validateJwt');

const router = Router();

router.get(
  '/',
  validateJwt,
  getUsers 
);

router.post(
  '/new', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
  ],
  createUser 
);

router.post(
    '/signin',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    sessionUser 
);




// router.post(
//     '/signup',
//     [
//         check('email', 'El correo es obligatorio').isEmail(),
//         check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
//         validateFields
//     ],
//     sessionUser 
// );

router.get('/refresh', validateJwt , refreshToken );

router.post('/google', googleAuth);

module.exports = router;
