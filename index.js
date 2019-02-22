// Dependencies
const express = require('express');
const genres = require('./routes/genres');

const app = express();

// Enable parsing of json in the body of a message
app.use(express.json());

// Set up the routes to use
app.use('/api/genres', genres);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
