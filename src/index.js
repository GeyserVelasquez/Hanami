const express = require ('express');
const app = express();
const morgan = require ('morgan');
const path = require('path');

// settings

app.set('port', process.env.PORT || 3010);
app.set('json spaces', 2)


//midlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //podemos soportar datos traidos de inputs y asi
app.use(express.json()); //permite que el servidor soporte jsons

// Serve static files
app.use(express.static(path.join(__dirname, '../www')));

//routes
app.use('/api', require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


//para correrlo y ver que funcione en la terminal "node src/index.js" y para limpiar la terminal "clear"
//he instalado nodemon y escribi en package.json  "scripts": { "dev": "nodemon src/index.j y ahora puedo solo escribir "npm run dev"