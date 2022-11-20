const fs = require('fs');
const Usuario = require('../model/usuario');
const Medico = require('../model/medico');
const Hospital = require('../model/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            const pathViejoMedico = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejoMedico);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            const pathViejoHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejoHospital);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejoUsuario);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
}


module.exports = {
    actualizarImagen
}