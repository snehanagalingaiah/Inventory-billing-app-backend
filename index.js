const express = require('express');
const mongo = require('./connect');
const productRouter = require('./router/product');
const invoiceRoutes =  require('./router/invoices');
const clientRoutes =  require('./router/client');
const profile =  require('./router/profile');

const dotenv = require('dotenv');

dotenv.config();
const app = express();
// to parse req.body, to send from client to express framework we are using this middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// mongo.connect();
mongo.connectMongoose();

app.use('/', (req,res,next) => {
   console.log("Custom Middleware");   
   next();
});
app.use('/product', productRouter);
app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/profiles', profile)


app.listen(process.env.PORT || 8000);
