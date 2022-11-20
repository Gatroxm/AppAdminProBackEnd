const { Schema, model } = require('mongoose');

const MedicolSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

}, { collection: 'medicos' });

MedicolSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Medico', MedicolSchema);