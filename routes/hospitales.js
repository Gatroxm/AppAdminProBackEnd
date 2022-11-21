/**
 * Ruta: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');

const {
    getHospitales,
    postHospitales,
    putHospitales,
    deletetHospitales
} = require('../controller/hospitales')

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHospitales)
router.post('/', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    validarCampos
], postHospitales)

router.put('/:id', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    validarCampos
], putHospitales)
router.delete('/:id', [
    validarJWT
], deletetHospitales)
module.exports = router;