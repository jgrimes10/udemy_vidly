const express = require('express');
const router = express.Router();
const validator = require('../shared/helpers/validate-genre');

const genres = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Sci-Fi'
    },
    {
        id: 3,
        name: 'Comedy'
    }
];

// GET all genres
router.get('/', (req, res) => {
    res.send(genres);
});

// GET a single genre by ID
router.get('/:id', (req, res) => {
    // Find the genre with the id at the end of the route
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // If that id doesn't exist in the db, return a 404 & return out of this method
    if (!genre) { // 404 - Not found
        return res.status(404).send(`The genre with ID ${req.params.id} was not found.`);
    }

    // Else, if it was found, return that genre
    res.send(genre);
});

// POST a single new genre
router.post('/', (req, res) => {
    // Validate
    const { error } = validator(req.body);

    // If invalid, return 400 - Bad request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Add the new genre to the db
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);

    // By convention, return the newly created genre
    res.send(genre);
});

// PUT an update genre
router.put('/:id', (req, res) => {
    // Find the genre with the id at the end of the route
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // If that id doesn't exist in the db, return a 404 & return out of this method
    if (!genre) { // 404 - Not found
        return res.status(404).send(`The genre with ID ${req.params.id} was not found.`);
    }

    // Validate the updated genre
    const { error } = validator(req.body);

    // If invalid, return 400 - Bad request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Else, if it is valid, update the genre
    genre.name = req.body.name;

    // By convention, return the updated genre
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Find the genre with the id at the end of the route
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // If that id doesn't exist in the db, return a 404 & return out of this method
    if (!genre) { // 404 - Not found
        return res.status(404).send(`The genre with ID ${req.params.id} was not found.`);
    }

    // Else if the genre with the passed id exists, delete it
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // By convention, return the deleted genre
    res.send(genre);
});

module.exports = router;
