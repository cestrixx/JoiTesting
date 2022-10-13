const Joi = require('joi');

const timestampSchema = Joi.date().timestamp();
console.log(timestampSchema.validate('12376834097810')); // { error: null, value: Sat Mar 17 2362 04:28:17 GMT-0500 (CDT) }

const rawTimestampSchema = Joi.date().timestamp().raw();
console.log(rawTimestampSchema.validate('12376834097810')); // { error: null, value: '12376834097810' }
