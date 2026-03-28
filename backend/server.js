const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/confiq/db');
const authRoutes = require('./src/routes/user');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));