const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const es6Renderer = require('express-es6-template-engine');

const indexRouter = require('./routes/index');
const businessRouter = require('./routes/businessroute');
const directoryRouter = require('./routes/directory');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/business', businessRouter);
app.use('/directory', directoryRouter);


module.exports = app;
