const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});