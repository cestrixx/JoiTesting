const Joi = require('joi');

// [FORK] ===============================================================================================================

let schema = Joi.object({
  a: Joi.number(),
  b: Joi.boolean().when('a', [
    { is: 0, then: Joi.valid(0).id('zero') },
    { is: 1, then: Joi.valid(1).id('one') },
  ]),
});

console.log(schema.validate({ a: 0, b: 0 }));
console.log(schema.validate({ a: 1, b: 1 }));
console.log(schema.validate({ a: 1, b: 2 }).error.message);

const forked = schema.fork('b.one', (schema) => schema.allow(2));
console.log(forked.validate({ a: 1, b: 2 }));

// ===============================================================================================================

schema = Joi.object({
  type: Joi.string().valid('A', 'B', 'C').required(), // required if type == 'A'
  foo: Joi.when('type', {
    is: 'A',
    then: Joi.string().valid('X', 'Y', 'Z').required(),
  }), // required if type === 'A' and foo !== 'Z'
  bar: Joi.string(),
}).when(Joi.object({ type: Joi.valid('A'), foo: Joi.not('Z') }).unknown(), {
  then: Joi.object({ bar: Joi.required() }),
});

console.log(schema.validate({ type: 'A', foo: 'X', bar: 'BAR' }));
console.log(schema.validate({ type: 'A', foo: 'Z' }));
console.log(schema.validate({ type: 'A', foo: 'X' }).error.message);
console.log(schema.validate({ type: 'C', foo: 'Y', bar: 'BAR' }));

// [SWITCH] ===============================================================================================================

schema = Joi.object({
  min: Joi.number(),
  max: Joi.number().when('min', {
    is: Joi.number().required(),
    then: Joi.number().greater(Joi.ref('min')),
  }),
});

console.log(schema.validate({ min: 1, max: 2 }));
console.log(schema.validate({ min: 1, max: 1 }).error.message);

schema = Joi.object({
  a: Joi.number().required(),
  b: Joi.number().when('a', {
    switch: [
      { is: 0, then: Joi.valid(1) },
      { is: 1, then: Joi.valid(2) },
      { is: 2, then: Joi.valid(3) },
    ],
    otherwise: Joi.valid(4),
  }),
});

console.log(schema.validate({ a: 0, b: 1 }));
console.log(schema.validate({ a: 1, b: 2 }));
console.log(schema.validate({ a: 2, b: 3 }));
console.log(schema.validate({ a: 0, b: 2 }).error.message);
console.log(schema.validate({ a: 1, b: 3 }).error.message);
console.log(schema.validate({ a: 2, b: 4 }).error.message);
console.log(schema.validate({ a: 3, b: 4 }));
console.log(schema.validate({ a: 3, b: 5 }).error.message);
console.log(schema.validate({ a: 4, b: 4 }));

// [IS|THEN] ===============================================================================================================

const schema = Joi.object({
  a: Joi.number().required(),
  b: Joi.number().when('a', [
    { is: 0, then: 1 },
    { is: 1, then: 2 },
    { is: 2, then: 3, otherwise: 4 },
  ]),
});

console.log(schema.validate({ a: 0, b: 1 }));
console.log(schema.validate({ a: 1, b: 2 }));
console.log(schema.validate({ a: 2, b: 3 }));
console.log(schema.validate({ a: 3, b: 4 }));
console.log(schema.validate({ a: 4, b: 5 }).error.message);
