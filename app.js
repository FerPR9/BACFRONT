var express = require('express');
var logger = require('morgan');
var areaRouter = require('./routes/area');
var indexRouter = require('./routes/index');
var registroRouter = require('./routes/registro');
var tallerRouter = require('./routes/taller');
var conferenciaRouter = require('./routes/conferencia');

var app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongo = require('./config/dbconfig');

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/registro', registroRouter);
app.use('/area', areaRouter);
app.use('/taller', tallerRouter);
app.use('/conferencia', conferenciaRouter);

module.exports = app;

