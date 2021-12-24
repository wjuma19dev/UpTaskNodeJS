const express = require('express');
const routes = require('./routes');
const path = require('path');

// Crea una app de express
const app = express();

// Habilitar los parses
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

// Donde cargar los archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/', routes());

app.listen(
    3000,
    console.log('Server running on port 3000')
);