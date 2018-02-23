import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import mapKeys from 'lodash.mapkeys';
import deepObjectMap from './deep_object_map';

const deepMapKeys = callback => deepObjectMap(object => mapKeys(object, (value, key) => callback(key)));

const deepMapKeysToCamelCase = deepMapKeys(camelCase);
const deepMapKeysToSnakeCase = deepMapKeys(key => (key.startsWith('_') ? key : snakeCase(key)));

export {
  deepMapKeys,
  deepMapKeysToCamelCase,
  deepMapKeysToSnakeCase,
};
