const Joi = require('joi');

const schema = Joi.object({
  a: Joi.any().forbidden(),
});

console.log('Valido: ', schema.validate({}));
console.log(
  'Invalido(Not undefined): ',
  schema.validate({ a: 10 }).error.message
);
