const Joi = require('joi');

let schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('username'),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
})
  .with('username', 'birth_year')
  .xor('password', 'access_token')
  .with('password', 'repeat_password');

//let data = schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

//let data = schema.validate({});
// -> { value: {}, error: '"username" is required' }

let data = schema.validate({
  username: 'abc',
  password: 'password',
  repeat_password: 'ddd',
  birth_year: 1994,
});

//console.log(data);
