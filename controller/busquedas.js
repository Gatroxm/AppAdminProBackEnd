const { response } = require("express");

const Usuario = require("../model/usuario");
const Hospital = require("../model/hospital");
const Medico = require("../model/medico");

const GetAllBusqueda = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });


}

const getDocumentosColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre')
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser medicos/hospitales/usuarios'
            });
    }

    res.json({
        ok: true,
        resultado: data
    });


}

module.exports = {
    GetAllBusqueda,
    getDocumentosColeccion
}