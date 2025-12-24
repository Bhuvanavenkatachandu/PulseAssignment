const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('MERN Stack API Running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
