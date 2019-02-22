const Joi = require('joi');

const validGenre = {
    name: Joi.string().min(3).required()
}

module.exports=validGenre;