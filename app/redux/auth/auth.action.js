export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const loginSuccess = (token: string) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    token,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
});
