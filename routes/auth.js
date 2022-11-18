/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/', [
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos
], login)

module.exports = router;