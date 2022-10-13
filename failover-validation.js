const Joi = require('joi');

const schema = Joi.object({
  depth: Joi.number().min(0).default(0).failover(1),
});

const result = schema.validate({ depth: -1 });
console.log(result);
