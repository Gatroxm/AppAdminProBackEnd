const { response } = require("express");
const Medico = require("../model/medico");
const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre')
    res.json({
        ok: true,
        medicos
    });
}
const postMedicos = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {

        const medicoGuardado = await medico.save();

        res.json({
            ok: true,
            medico: medicoGuardado
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }
}
const putMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Put Medicos'
    })
}
const deletetMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete Medicos'
    })
}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deletetMedicos
}