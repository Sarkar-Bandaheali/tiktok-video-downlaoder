// Sarkar-MD
const express = require('express');
const cors = require('cors');
const path = require('path');

const downloaderRoute = require('./routes/downloader');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', downloaderRoute); // Add downloader routes under "/api"

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// POWERED BY BANDAHEALI
