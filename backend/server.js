const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for simplicity, in production set to frontend URL
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: ['http://localhost:5174', 'https://pulseassignment.netlify.app'],
    credentials: true
}));
app.use(express.json());

// Database Connection
console.log('Attempting to connect with MONGO_URI:', process.env.MONGO_URI ? 'Defined' : 'Undefined');
mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Make io accessible in routes
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
