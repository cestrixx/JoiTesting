const Joi = require('joi');

let schema = Joi.string().empty('');
console.log(schema.validate('')); // returns { error: null, value: undefined }
schema = schema.empty();
console.log(schema.validate('').error.message); // returns { error: "value" is not allowed to be empty, value: '' }
