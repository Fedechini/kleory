const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const postRouter = require('./routes/postRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api/v1/post', postRouter);

module.exports = app;
