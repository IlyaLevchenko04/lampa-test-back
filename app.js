const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const productsRoute = require('./routes/api/v1/products/productsRoute');
const categoryRoute = require('./routes/api/v1/categories/categoryRoute');
const authRoute = require('./routes/api/v1/auth/authRoute');
const { errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API Specification',
      description:
        'This routes allow to manipulate with products, categories and users.',
      contact: {
        name: 'API Support',
        email: 'nneo2086@gmail.com/',
      },
      version: '1.0',
    },
    servers: [
      {
        description: 'Public server (v1)',
        url: `https://products-api-umhe.onrender.com/api`,
      },
      {
        description: 'Test server (v1)',
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
    schemes: ['https'],
  },
  apis: ['server.js', './routes/**/*.js'],
};
const apiSpecification = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const { limit } = req.query;

  if (Number(limit) > 1000) {
    req.query.limit = '1000';
  }

  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecification));

app.use('/api/products', productsRoute);

app.use('/api/category', categoryRoute);

app.use('/api/auth', authRoute);

app.use((req, res) => {
  res.status(404).sendFile(`${__dirname}/template404/index.html`);
});

app.use(errorHandler);

// swager add currency

module.exports = app;
