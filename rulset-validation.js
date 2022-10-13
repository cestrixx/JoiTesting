const Joi = require('joi');

let schema = Joi.number()
  .ruleset.min(1)
  .max(10)
  .rule({ message: 'Number must be between 1 and 10' });
console.log(schema.validate(0).error.message);
schema = Joi.number()
  .$.min(1)
  .max(10)
  .rule({ message: 'Number must be between 1 and 10' });
console.log(schema.validate(0).error.message);
