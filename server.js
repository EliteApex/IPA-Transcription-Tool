const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


const getNextWord = require('./public/words');


// Serve static files (CSS, client-side JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse the body of the request as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint to handle the form submission
app.post('/submit-text', (req, res) => {
    console.log('Text received:', req.body.textInput);
    res.send('Text received: ' + req.body.textInput);
  });

app.get('/next-word', (req, res) => {
    res.send(getNextWord());
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


