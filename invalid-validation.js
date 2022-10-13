const Joi = require('joi');

const schema = Joi.object({
  a: Joi.any().invalid('a'),
  b: Joi.any().invalid('b', 'B'),
});

console.log('Valido: ', schema.validate({ a: 'z', b: 'a' }));
console.log('Invalido: ', schema.validate({ a: 'a', b: 'a' }).error.message);
console.log('Invalido: ', schema.validate({ a: 'z', b: 'b' }).error.message);
console.log('Invalido: ', schema.validate({ a: 'z', b: 'B' }).error.message);
