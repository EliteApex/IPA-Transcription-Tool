const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// Middleware to parse the body of the request as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, client-side JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint to handle the form submission
app.post('/submit-text', (req, res) => {
    console.log('Text received:', req.body.textInput);
    res.send('Text received: ' + req.body.textInput);
  });
// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});