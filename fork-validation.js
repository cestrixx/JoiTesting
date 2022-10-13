const Joi = require('joi');

const before = Joi.object({ a: Joi.number().id('x') });
console.log(before.validate({ a: 1 }));
const after = before.fork('x', (schema) => schema.min(10)); // Joi.object({ a: Joi.number().min(10).id('x') });
console.log(after.validate({ a: 1 }).error.message);
