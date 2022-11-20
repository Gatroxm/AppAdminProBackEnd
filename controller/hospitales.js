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
const putHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Put Hospitales'
    })
}
const deletetHospitales = (req, res = response) => {
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