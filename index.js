const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { connectionDatabase } = require('./config/database');
require('dotenv').config();

const app = express();
connectionDatabase();
app.use(logger('dev'));
app.use(cors())
app.use( express.static('public') );
app.use( express.json() );

// Mis rutas
app.use('/',          require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/todos', require('./routes/todos'));


// Ejecución del servidor ...
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
