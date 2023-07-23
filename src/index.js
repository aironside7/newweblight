const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require("./swagger")
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const port = 4000;


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://aniroycr7:aniroycr7@cluster0.5kuxqud.mongodb.net/newdata?retryWrites=true&w=majority")
    // mongoose.set('strictQuery', true)

.then(()=>{
    console.log("connection with database succes")
}).catch((err)=>{
    console.log(err)
})


app.use(express.json());
app.use(cors());
// swaggerDoc(app)
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// Swagger Configuration

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FMCG App API',
      version: '1.0.0',
      description: 'API documentation for FMCG App',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Add this to make all endpoints require authorization
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API route files
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});