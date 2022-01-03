const express = require('express');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la base de datos
const db = require('./config/db');

// Importar los modelos para la creacion en automatico en caso de que no existan las tablas
require('./model/Proyectos');
require('./model/tareas');
require('./model/Usuarios');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch(error => console.log(error));

// Crea una app de express
const app = express();

// Habilitar los parses
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

// Use express session before flash
const sess = {
  secret: 'uptasknodejs',
  resave: false,
  saveUninitialized: false
}
app.use(session(sess));

// Flash messages
app.use(flash());

// Pasar vardump a la aplicacion
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
});

// Donde cargar los archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/', routes());

app.listen(
    3000,
    console.log('Servidor corriendo en el puerto 3000')
);
