/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos
], login)
router.post('/google', loginGoogle)
router.get('/renew', validarJWT, renewToken)

module.exports = router;