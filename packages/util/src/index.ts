import { get, set } from 'lodash-unified';
import { Arrayable } from './types';

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val: any) {
      set(obj, path, val);
    }
  };
};

export const ensureArray = (val: any) => {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};
