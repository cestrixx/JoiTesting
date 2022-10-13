const Joi = require('joi');

const schema = Joi.array().items(Joi.string().valid('a', 'b'));
console.log(schema.validate(['a', 'b', 'a']));
console.log(schema.validate(['a', 'b', 'c']).error.message);

console.log('OP1');
let schema = Joi.array().items(Joi.string().valid('a', 'b'));
console.log(schema.validate(['a', 'b', 'a']));
console.log(schema.validate(['a', 'b', 'c']).error.message);

console.log('OP2');
schema = Joi.array().items(Joi.string(), Joi.number());
console.log(schema.validate(['a', 'b', 1, 2]));
console.log(schema.validate(['a', 1, true]).error.message);

console.log('OP3');
schema = Joi.array().items(Joi.string().required(), Joi.string().required());
console.log(schema.validate(['a', 'b']));
console.log(schema.validate(['a']).error.message);

console.log('OP4');
schema = Joi.array().items(
  Joi.string().valid('not allowed').forbidden(),
  Joi.string()
);
console.log(schema.validate(['a', 'b']));
console.log(schema.validate(['a', 'not allowed']).error.message);

console.log('OP5');
schema = Joi.array().items(
  Joi.string().label('My string').required(),
  Joi.number().required()
);
console.log(schema.validate([1]).error.message);
