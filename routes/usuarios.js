/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator')
const {
    getUsuarios,
    PostUsuarios,
    PutUsuario,
    DeleteUsuario
} = require('../controller/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT
], getUsuarios)
router.post('/', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos,
], PostUsuarios)

router.put('/:id', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('role', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos,
], PutUsuario)
router.delete('/:id', [
    validarJWT
], DeleteUsuario)
module.exports = router;