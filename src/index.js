//servidor

const express = require ('express');
const morgan = require ('morgan');
const path = require('path');
const cors = require('cors');
const { testConnection } = require('../www/db/db');
const router = require('./routes/index');


// settings
const app = express();
app.set('port', process.env.PORT || 3010);
app.set('json spaces', 2)

const allowedOrigins = ['http://localhost:3306','http://localhost:3010', 'https://hanaminepos.000webhostapp.com'];


//midlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //podemos soportar datos traidos de inputs y asi
app.use(express.json()); //permite que el servidor soporte jsons

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));


// Serve static files
app.use(express.static(path.join(__dirname, '../www')));

//routes
app.use('/api', require('./routes/index'));

testConnection();

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


//para correrlo y ver que funcione en la terminal "node src/index.js" y para limpiar la terminal "clear"
//he instalado nodemon y escribi en package.json  "scripts": { "dev": "nodemon src/index.j y ahora puedo solo escribir "npm run dev"