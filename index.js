// package imports

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path  = require('path');

// file imports

const centreRoute = require('./routes/centreRoutes');
const careerRoute = require('./routes/careerRoute');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes')
const mailRoutes = require('./routes/mailRoute')
dotenv.config(); // will always be on top

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://myproductiondomain.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/centre_photos', express.static(path.join(__dirname, 'centre_photos')));
connectDB();


app.use('/api', centreRoute);
app.use('/api',careerRoute);
app.use('/api', uploadRoutes);
app.use('/api', mailRoutes)





app.listen(process.env.PORT || 7000, () => {
  console.log("Server is running successfully on port", process.env.PORT || 7000);
});
