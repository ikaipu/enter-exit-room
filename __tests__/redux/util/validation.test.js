/* eslint-disable max-statements */
import { isValidEmailFormat } from '../../../app/redux/util/validation';

describe('utilies used by reducers and selectors', () => {
  it('should validate email', () => {
    expect(isValidEmailFormat('dexter@email.com')).toBe(true);
    expect(isValidEmailFormat('dexter@email.co')).toBe(true);
    expect(isValidEmailFormat('dexter@email.c')).toBe(false);
    expect(isValidEmailFormat('dexteremail.com')).toBe(false);
  });
});
