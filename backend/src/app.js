require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require("./routes");
const morgan = require('morgan')
const helmet = require("helmet");
const winston = require('./config/winston');

const app = express();

app.use(cors({
    "origin": "*",
    "methods": "GET,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.disable("x-powered-by");
app.use(helmet())
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(routes);
app.use(errors())
module.exports = app;
