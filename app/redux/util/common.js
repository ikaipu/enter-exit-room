/*
 * accepts an array of Objects and returns an Object
 * wherein the properties are the elements of the array;
 * the keys of the returned object are the values of
 * the `key` parameter taken from each element of the array
 *
 * @param {Object[]} arr - array of objects
 * @param {string} [default='id'] key - property of each element to use as the key
 * @param {Function} optional - function that is applied against all the array elements
 *                              accepts an Object and returns an Object
 * @returns Object
 */
export const arrayToObject = (
  arr: Object[],
  key: string = 'id',
  mapFunction: Function = obj => obj,
): Object =>
  arr.reduce((accumulator, obj) => {
    if (obj[key]) {
      return {
        ...accumulator,
        [obj[key]]: mapFunction(obj),
      };
    }

    return accumulator;
  }, {});

/*
 * deletes properties from an Object immutably
 * retuns a new Object instead of mutating the passed Object parameter
 *
 * @param {Object} object
 * @param {[string]} props - array of property names to be removed from Object
 * @returns Object
 */
export const deleteProperties = (object: Object, props: [string]): Object => ({
  ...Object.keys(object)
    .filter(key => props.indexOf(key) < 0)
    .reduce(
      (newObj, key) => ({
        ...newObj,
        [key]: object[key],
      }),
      {},
    ),
});

/*
 * IMPORTANT!
 *
 * Needs to be implement per project;
 * depends on api response
 */
export const reducerErrorToString = (
  error: any,
  defaultMessage: string,
): string => {
  if (error) {
    if (typeof error === 'string') {
      return error;
    }

    return 'Please implement';
  }

  return defaultMessage;
};

/*
 * converts seconds to 00:00:00 format
 * upper limit is 23:59:59 or 86399 seconds
 * 86400 seconds goes back to 00:00:00
 */
export const secondsToDigitalClockFormat = (seconds: number): string =>
  new Date(1000 * seconds).toISOString().substr(11, 8);
