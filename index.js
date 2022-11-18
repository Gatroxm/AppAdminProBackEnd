require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Servidor de Express
const app = express();

// Configurar cors
app.use(cors());

//Lectura y parseo de Body para

app.use(express.json());

//Base de datos 
dbConection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})