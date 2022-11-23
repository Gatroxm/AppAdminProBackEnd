const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email: email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} no se encuentra registrado`
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
const loginGoogle = async(req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        await usuario.save();
        //Generar JWT
        const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }
}
const renewToken = async(req, res = response) => {
    const uid = req.uid;
    //Generar JWT
    const [token, usuario] = await Promise.all([
        generarJWT(uid),
        Usuario.findById(uid)
    ])

    res.json({
        ok: true,
        token,
        usuario
    })
}
module.exports = {
    login,
    loginGoogle,
    renewToken
}