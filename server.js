const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const serviceRequestStatusRoutes = require('./routes/serviceRequestStatusRoute');
const serviceDeptRoutes = require('./routes/serviceDeptRoutes');
const errorHandler = require('./middleware/errorHandler');

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
app.use('/api/service-departments', serviceDeptRoutes);

// global error handler (centralized)
app.use(errorHandler);

// start server on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})

