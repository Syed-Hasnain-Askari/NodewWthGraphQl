'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(
	cors({
		origin: '*',
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
// Middleware
app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization',
		'X-API-KEY',
		'Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'Access-Control-Allow-Request-Method'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
// These all are endpoint

// for products
app.get('/', (req, res, next) => {
	res.send('Hellow world');
});

module.exports = app;
