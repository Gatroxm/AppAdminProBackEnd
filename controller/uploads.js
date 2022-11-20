const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const { tipo, id } = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un Médico, Usuario u Hospital'
        });
    }
    // validar que exista un archivo 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    //Procesar la imagen 
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (!extencionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitoda'
        });
    }

    //Generar el nombre de archivo 

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });


}

const retornaImagen = (req, res = response) => {
    const { tipo, foto } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg)
    } else {
        const pathImg = path.join(__dirname, `../uploads/noimage.jpg`);
        res.sendFile(pathImg)
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}