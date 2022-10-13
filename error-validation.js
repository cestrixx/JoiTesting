const Joi = require('joi');

function run(escolha) {
  switch (escolha) {
    case 1:
      {
        const schema = Joi.string().error(
          new Error('Was REALLY expecting a string')
        );
        console.log('Exemplo: ', schema.validate(3)); // returns Error('Was REALLY expecting a string')
      }
      break;
    case 2:
      {
        const schema = Joi.object({
          foo: Joi.number()
            .min(0)
            .error((errors) => new Error('"foo" requires a positive number')),
        });
        console.log('Exemplo: ', schema.validate({ foo: -2 })); // returns new Error('"foo" requires a positive number')
      }
      break;
    case 3:
      {
        const schema = Joi.object({
          foo: Joi.number()
            .min(0)
            .error((errors) => {
              return new Error(
                'found errors with ' +
                  errors
                    .map(
                      (err) =>
                        `${err.local.key}(${err.local.limit}) with value ${err.local.value}`
                    )
                    .join(' and ')
              );
            }),
        });
        console.log('Exemplo: ', schema.validate({ foo: -2 })); // returns new Error('found errors with foo(0) with value -2')
      }
      break;
  }
}

run(2);
