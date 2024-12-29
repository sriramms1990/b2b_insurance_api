const swaggerJsdoc = require('swagger-jsdoc');
const { tags } = require('./tags');
const { servers } = require('./servers');
const { info } = require('./info');

const options = {
  definition: {
    openapi: '3.0.0',
    info,
    servers,
    tags,
  },
  apis: ['./src/docs/*.yml'],
};

module.exports = swaggerJsdoc(options);