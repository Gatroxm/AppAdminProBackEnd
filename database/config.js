const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Online')
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de conectar a la base de datos')
    }
}

module.exports = {
    dbConection
};