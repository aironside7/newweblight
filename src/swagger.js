// File: swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API',
    version: '1.0.0',
    description: 'Your API description',
  },
  servers: [
    {
      url: 'http://localhost:4000', // Update the URL with your API base URL
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Path to the API routes folder
  security: [{ bearerAuth: [] }],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
