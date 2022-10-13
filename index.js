const Joi = require('joi');

console.log('LENGTH');
let schema = Joi.array().length(5);
console.log(schema.validate([1, 2, 3, 4, 5]));
console.log(schema.validate([1, 2, 3, 4]).error.message);
console.log(schema.validate([1, 2, 3, 4, 5, 6]).error.message);

schema = Joi.object({
  limit: Joi.number().integer().required(),
  numbers: Joi.array().length(Joi.ref('limit')).required(),
});
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3] }));
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3, 4] }).error.message);

console.log('MAX');
schema = Joi.array().max(10);
console.log(schema.validate([1, 2, 3, 4, 5]));
console.log(schema.validate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).error.message);

schema = Joi.object({
  limit: Joi.number().integer().required(),
  numbers: Joi.array().max(Joi.ref('limit')).required(),
});
console.log(schema.validate({ limit: 3, numbers: [1, 2] }));
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3] }));
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3, 4] }).error.message);

console.log('MIN');
schema = Joi.array().min(2);
console.log(schema.validate([1, 2]));
console.log(schema.validate([1]).error.message);

schema = Joi.object({
  limit: Joi.number().integer().required(),
  numbers: Joi.array().min(Joi.ref('limit')).required(),
});
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3, 4] }));
console.log(schema.validate({ limit: 3, numbers: [1, 2, 3] }));
console.log(schema.validate({ limit: 3, numbers: [1, 2] }).error.message);
