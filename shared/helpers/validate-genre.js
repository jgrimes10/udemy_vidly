const Joi = require('joi');
const schema = require('../../schemas/genre.schema');

function validateGenre(genre) {
    return Joi.validate(genre, schema);
}

module.exports = validateGenre;