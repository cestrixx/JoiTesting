const Joi = require('joi');
const simpleColorConverter = require('simple-color-converter');

const changeGoogleValueToMapboxValue = (value, map, returnError = false) => {
  const valueType = value.toLowerCase();
  if (valueType in map) return map[valueType];
  if (returnError) throw new Error();
  return valueType;
};

const changeGoogleColorValueToMapboxColorValue = (value) => {
  const result = new simpleColorConverter({ color: value, to: 'hex6' });
  console.log(result);
  return `#${A}`;
};

schema = Joi.object()
  .keys({
    strokeOpacity: Joi.string()
      .default((value, a) => {
        const { color } = new simpleColorConverter({
          color: value.stroke,
          to: 'rgba',
        });
        return color.a;
      })
      .error(new Error('Propriedade strokeOpacity invalida!')),
    'stroke-width': Joi.number()
      .integer()
      .error(new Error('Propriedade weight invalida!')),
    stroke: Joi.string()
      .custom((value) => changeGoogleColorValueToMapboxColorValue(value))
      .error(new Error('Propriedade marker-color invalida!')),
    fill: Joi.string()
      .optional()
      .custom((value) => changeGoogleColorValueToMapboxColorValue(value))
      .error(new Error('Propriedade fillcolor invalida!')),
  })
  .rename('color', 'stroke')
  .rename('fillcolor', 'fill')
  .rename('weight', 'stroke-width');

const properties = {
  color: '&&&',
  fillcolor: '0x555555',
  weight: 3,
};
const result = schema.validate(properties, {
  allowUnknown: true,
});
console.log(JSON.stringify(result.value, null, 2));
