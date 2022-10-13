const Joi = require('joi');

const method = (value, helpers) => {
  // Throw an error (will be replaced with 'any.custom' error)
  if (value === '1') {
    throw new Error('nope');
  }

  // Replace value with a new value
  if (value === '2') {
    return '3';
  }

  // Use error to return an existing error code
  if (value === '4') {
    return helpers.error('any.invalid');
  }

  // Override value with undefined to unset
  if (value === '5') {
    return undefined;
  }

  // Return the value unchanged
  return value;
};

const schema = Joi.string().custom(method, 'custom validation');

console.log(schema.validate('1').error.message);
console.log(schema.validate('2'));
console.log(schema.validate('3'));
console.log(schema.validate('4').error.message);
console.log(schema.validate('5'));
console.log(schema.validate('6'));
