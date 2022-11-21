const { response } = require("express");
const Hospital = require("../model/hospital");


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img')
    res.json({
        ok: true,
        hospitales
    });
}
const postHospitales = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {

        const hospitalGuardado = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalGuardado
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }
}
const putHospitales = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: `E Hospital con el id ${id} No existe`
            });
        }
        const cambioHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, { new: true })
        res.json({
            ok: true,
            Hospital: hospitalActualizado
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }


}
const deletetHospitales = async(req, res = response) => {

    const { id } = req.params;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: `E Hospital con el id ${id} No existe`
            });
        }

        await Hospital.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: "Hospital eliminado"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado...'
        })
    }
    res.json({
        ok: true,
        msg: 'Get Hospitales'
    })
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deletetHospitales
}