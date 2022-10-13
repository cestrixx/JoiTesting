const Joi = require('joi');

const schema = Joi.object({
  first_name: Joi.string().label('First Name'),
});
console.log(schema.validate({ first_name: 10 }).error.message);
