const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const publicRoutes = require('./routes/public');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use('/api', publicRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('PharmaSlot API is running');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
