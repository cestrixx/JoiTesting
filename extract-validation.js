const Joi = require('joi');

const d = Joi.number();
const e = Joi.number().default(10);
const c = Joi.object({ d, e });
const b = Joi.object({ c });
const a = Joi.object({ b });

console.log(a.extract('b.c.d').validate({ b: { c: { d: 1 } } }).error.message);
console.log(
  a.extract(['b', 'c', 'd']).validate({ b: { c: { d: 1 } } }).error.message
);
