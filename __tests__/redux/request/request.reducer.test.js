import {
  sendRequest,
  cancelRequest,
  requestError,
  requestComplete,
  dismissResult,
} from '../../../app/redux/request/request.action';
import { LOGIN } from '../../../app/redux/request/request.constants';
import reducer from '../../../app/redux/request/request.reducer';

describe('request reducer tests', () => {
  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: true,
          error: false,
          message: 'Signing In...',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, sendRequest(LOGIN, '', {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          message: '',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, cancelRequest(LOGIN, '', {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: true,
          message: 'Failed to Sign In',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, requestError(LOGIN, '', null, {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: true,
          message: 'Failed to Sign In',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, requestError(LOGIN, '', null, {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          message: 'Logged In',
          success: true,
        },
      },
    }).toEqual(
      reducer(undefined, requestComplete(LOGIN, '', { success: true })),
    );
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          message: '',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, dismissResult(LOGIN, '', {})));
  });
});
