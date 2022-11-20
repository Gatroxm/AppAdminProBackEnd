/**
 * Ruta: /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator');

const {
    getMedicos,
    postMedicos,
    putMedicos,
    deletetMedicos
} = require('../controller/medicos')

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMedicos)
router.post('/', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('hospital', 'EL hospital es obligatorio').not().isEmpty(),
    check('hospital', 'EL id de el hospital deveser válido').isMongoId(),
    validarCampos
], postMedicos)

router.put('/:id', putMedicos)
router.delete('/:id', deletetMedicos)
module.exports = router;