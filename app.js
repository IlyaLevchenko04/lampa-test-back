const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/productsRoute');
const categoryRoute = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);

app.use('/api/category', categoryRoute);

app.use('/api/auth', authRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
