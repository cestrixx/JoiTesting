const Joi = require('joi');

const schema = Joi.number().min(1).rule({ keep: true }).min(2);
console.log(schema.validate(2));
console.log(schema.validate(1).error.message);
