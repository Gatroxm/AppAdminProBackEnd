const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../model/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),
        Usuario.count()
    ])

    res.json({
        ok: true,
        usuarios,
        total,
        uid: req.uid
    })

}

const PostUsuarios = async(req, res = response) => {
    const { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado`
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuarios
        await usuario.save();
        //Generar JWT
        const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            usuario,
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

const PutUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const existeUsuarioBd = await Usuario.findById(uid);

        if (!existeUsuarioBd) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario con el id ${uid} No se encuentra registrado`
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (existeUsuarioBd.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: `El correo ${email} ya se encuentra registrado`
                });
            }
        }
        if (!existeUsuarioBd.google) {

            campos.email = email;
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }

}

const DeleteUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const existeUsuarioBd = await Usuario.findById(uid);

        if (!existeUsuarioBd) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario con el id ${uid} No se encuentra registrado`
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: `El usuario con el id ${uid} due eliminado`
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
    getUsuarios,
    PostUsuarios,
    PutUsuario,
    DeleteUsuario
}