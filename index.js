require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Servidor de Express
const app = express();

// Configurar cors
app.use(cors());

//Base de datos 
dbConection();

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })

})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})