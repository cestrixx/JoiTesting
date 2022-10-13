const Joi = require('joi');

let schema = Joi.object({
  username: Joi.string(),
  password: Joi.string().strip(),
});
console.log(schema.validate({ username: 'test', password: 'hunter2' })); // result.value = { username: 'test' }

schema = Joi.array().items(Joi.string(), Joi.any().strip());
console.log(schema.validate(['one', 'two', true, false, 1, 2])); // result.value = ['one', 'two']
