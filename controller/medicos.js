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
const putMedicos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            console.error(error)
            return res.status(404).json({
                ok: false,
                msg: `No se encuentras Medicos con el id: ${id}`
            })
        }

        const cambioMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true })
        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }

}
const deletetMedicos = async(req, res = response) => {
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            console.error(error)
            return res.status(404).json({
                ok: false,
                msg: `No se encuentras Medicos con el id: ${id}`
            })
        }

        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    postMedicos,
    putMedicos,
    deletetMedicos
}