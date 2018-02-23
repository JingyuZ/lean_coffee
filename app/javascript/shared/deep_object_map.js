import isPlainObject from 'lodash.isplainobject';
import map from 'lodash.map';
import mapValues from 'lodash.mapvalues';

const deepObjectMap = mapper => {
  const applyMapper = obj => {
    if (isPlainObject(obj)) {
      const x = mapValues(obj, applyMapper);
      return mapper(x);
    }
    if (Array.isArray(obj)) {
      return map(obj, applyMapper);
    }
    return obj;
  };

  return applyMapper;
};

export default deepObjectMap;
