const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (CSS, client-side JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// POST endpoint to handle the transcription check
app.post('/check_transcription', (req, res) => {
    const transcription = req.body.transcription;

    // Here you would add the logic to check the transcription,
    // for now, we will just send back a placeholder response
    res.json({ feedback: `Received transcription: ${transcription}` });
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});