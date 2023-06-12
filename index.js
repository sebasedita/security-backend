const express = require("express");
const { getConnection } = require('./db/db-connection-mongo');
const cors = require("cors")
require ("dotenv").config();

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT;



//Implementado Cors
app.use (cors())

getConnection();

//middlewares
app.use(express.urlencoded({extended: false}));

// Parseo JSON
app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/auth', require('./router/auth'));
app.use('/estadoEquipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca'));
app.use('/tipoEquipo', require('./router/tipoEquipo'));

app.listen(port, host, () => {
    console.log(`Example app listening on port${port}`)
});

