const Joi = require('joi');

const schema = Joi.string()
  .required()
  .external(async function (value, helper) {
    let sun = 0;
    let rest = 0;
    if (value == '00000000000') throw new Error(`Cpf: ${value} invalido!`);
    for (i = 1; i <= 9; i++)
      sun = sun + parseInt(value.substring(i - 1, i)) * (11 - i);
    rest = (sun * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(9, 10)))
      throw new Error(`Cpf: ${value} invalido!`);
    sun = 0;
    for (i = 1; i <= 10; i++)
      sun = sun + parseInt(value.substring(i - 1, i)) * (12 - i);
    rest = (sun * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(10, 11)))
      throw new Error(`Cpf: ${value} invalido!`);
  });

schema
  .validateAsync('47597478003')
  .then((value) => console.log(`Cpf: ${value} valido!`))
  .catch((err) => console.log(err.message));

schema
  .validateAsync('00000000000')
  .then((value) => console.log(`Cpf: ${value} valido!`))
  .catch((err) => console.log(err.message));
