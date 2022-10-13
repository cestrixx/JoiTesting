const Joi = require('joi');

let schema = Joi.any()
  .valid('foo', 'bar')
  .description('this key will match anything you give it');
console.log(schema.describe());

schema = Joi.number()
  .description('Latitude(Norte|Sul[N,S]|Y)')
  .unit('degrees')
  .tag('latitude')
  .example(42.2679564);
console.log(schema.describe());

schema = Joi.string().min(4).example('abcd');
console.log(JSON.stringify(schema.describe(), null, 2));

schema = Joi.any().tag('api', 'user');
console.log(schema.describe());
