export const SAMPLE = 'SAMPLE';
export const LOGIN = 'LOGIN';

export default {
  [LOGIN]: {
    loaderMessage: 'Signing In...',
    defaultErrorMessage: 'Failed to Sign In',
    successMessage: 'Logged In',
  },
  [SAMPLE]: {
    loaderMessage: 'Loading...',
    defaultErrorMessage: 'Failed on purpose',
    successMessage: 'Success',
  },
};
