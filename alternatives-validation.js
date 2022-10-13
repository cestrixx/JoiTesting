const Joi = require('joi');

const schema = Joi.alternatives().try(Joi.number(), Joi.string());
console.log(schema.validate(10));
console.log(schema.validate('10'));
console.log(schema.validate([10]).error.message);
console.log(schema.validate({}).error.message);

// [CONDITIONAL] ===============================================================================================================

const before = Joi.object({
  a: Joi.number(),
  b: Joi.alternatives().conditional('a', {
    switch: [
      { is: 0, then: Joi.valid(0).id('zero') },
      { is: 1, then: Joi.valid(1).id('one'), otherwise: Joi.boolean() },
    ],
  }),
});

console.log(before.validate({ a: 0, b: 0 }));
console.log(before.validate({ a: 1, b: 1 }));
console.log(before.validate({ a: 2, b: true }));
console.log(before.validate({ a: 2, b: 1 }).error.message);

// [MATCH] ===============================================================================================================

console.log('ONE');

let schema = Joi.alternatives([Joi.number(), Joi.string()]).match('one');
console.log(schema.validate('2').error.message);
console.log(schema.validate(true).error.message);
console.log(schema.validate(2));

console.log('ANY');

schema = Joi.alternatives().try(Joi.number(), Joi.string()).match('any');
console.log(schema.validate('2'));
console.log(schema.validate(true).error.message);
console.log(schema.validate(2));

console.log('ALL');

schema = Joi.alternatives().try(Joi.number(), Joi.string()).match('all');
console.log(schema.validate('2'));
console.log(schema.validate(true).error.message);
console.log(schema.validate(2).error.message);
