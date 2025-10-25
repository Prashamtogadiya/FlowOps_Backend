const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const serviceRequestStatusRoutes = require('./routes/serviceRequestStatusRoute');

dotenv.config(); // load .env
console.log('Database Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});
const app = express()

app.use(cors()) // CORS
app.use(express.json()) // JSON body parser
app.use(express.urlencoded({ extended: true })); // form body parser

// mount routes
app.use('/api/service-request-status', serviceRequestStatusRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})