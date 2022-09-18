const express = require('express');

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(authRoutes);

module.exports = app;