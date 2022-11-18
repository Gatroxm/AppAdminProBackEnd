const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email: email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado`
            });
        }
        const validaPass = bcrypt.compareSync(password, usuarioDB.password);
        if (!validaPass) {
            return res.status(400).json({
                ok: false,
                msg: `Contraseña no valida`
            });
        }
        //Generar JWT
        const token = await generarJWT(usuarioDB.id)
        res.json({
            ok: true,
            msg: 'Bienvenido',
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }
}

module.exports = {
    login
}