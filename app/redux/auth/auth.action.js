import { StackActions } from 'react-navigation';
import {
  sendRequestAwait,
  cancelRequest,
  dismissResult,
} from '../request/request.action';
import { LOGIN } from '../request/request.constants';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const login = () =>
  sendRequestAwait(
    LOGIN,
    '',
    {
      method: 'POST',
      route: 'login',
      params: {},
    },
    {
      successAction: StackActions.replace({
        routeName: 'Main',
      }),
    },
  );

export const cancelLogin = () => cancelRequest(LOGIN, '');

export const dismissLoginResult = () => dismissResult(LOGIN, '');

export const loginSuccess = (token: string) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    token,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
});
