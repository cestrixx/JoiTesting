// run `node index.js` in the terminal
const Joi = require('joi');

const generateUsername = (parent, helpers) => {
  return parent.firstname.toLowerCase() + '-' + parent.lastname.toLowerCase();
};

generateUsername.description = 'generated username';

const schema = Joi.object({
  username: Joi.string().default(generateUsername),
  firstname: Joi.string(),
  lastname: Joi.string(),
  created: Joi.date().default(Date.now),
  status: Joi.string().default('registered'),
});

const { value } = schema.validate({
  firstname: 'Jane',
  lastname: 'Doe',
});

console.log(value);

// value.status === 'registered'
// value.username === 'jane-doe'
// value.created will be the time of validation
