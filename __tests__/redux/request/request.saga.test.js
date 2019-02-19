import { put, take, all } from 'redux-saga/effects';
import defaultSendRequest, {
  shouldCancel,
} from '../../../app/redux/request/request.saga';
import {
  sendRequest,
  cancelRequest,
  requestError,
  requestComplete,
} from '../../../app/redux/request/request.action';

describe('request saga tests', () => {
  it('shouldCancel should return true', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const cancelRequestAction = cancelRequest('LOGIN', '');
    const gen = shouldCancel(requestAction);

    gen.next(cancelRequestAction);
    expect(gen.next(cancelRequestAction).value).toBe(true);
  });

  it('shouldCancel should not return', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const cancelRequestAction = cancelRequest('LOGIN', 'asdf');
    const gen = shouldCancel(requestAction);

    gen.next(cancelRequestAction);
    expect(gen.next(cancelRequestAction).value).toEqual(
      take(cancelRequestAction.type),
    );
  });

  it('sendRequest should dispatch results', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const gen = defaultSendRequest(requestAction);

    gen.next();

    expect(
      gen.next({
        response: { success: true },
        timeout: undefined,
        cancelled: undefined,
      }).value,
    ).toEqual(put(requestComplete('LOGIN', '', { success: true })));

    expect(gen.next().value).toBeUndefined();
  });

  it('sendRequest should timeout', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const gen = defaultSendRequest(requestAction);

    gen.next();

    expect(
      gen.next({ response: undefined, timeout: true, cancelled: undefined })
        .value,
    ).toEqual(put(requestError('LOGIN', '', 'Request timeout')));

    expect(gen.next().value).toBeUndefined();
  });

  it('sendRequest should catch error', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const gen = defaultSendRequest(requestAction);

    gen.next()

    expect(gen.throw('API ERROR').value).toEqual(
      put(requestError('LOGIN', '', 'API ERROR')),
    );

    expect(gen.next().value).toBeUndefined();
  });

  it('sendRequest should return when cancelled', () => {
    const requestAction = sendRequest('LOGIN', '', {});
    const gen = defaultSendRequest(requestAction);

    gen.next();

    gen.next({ response: undefined, timeout: undefined, cancelled: true });

    expect(gen.next().value).toBeUndefined();
  });

  it('sendRequest should dispatch success action', () => {
    const successAction = {
      type: 'OK',
    };
    const requestAction = sendRequest('LOGIN', '', {}, successAction);
    const gen = defaultSendRequest(requestAction);

    gen.next();

    expect(
      gen.next({
        response: { success: true },
        timeout: undefined,
        cancelled: undefined,
      }).value,
    ).toEqual(put(requestComplete('LOGIN', '', { success: true })));

    expect(gen.next().value).toEqual(put(successAction));
  });

  it('sendRequest should dispatch success actions', () => {
    const action1 = { type: 'OK' };
    const action2 = { type: 'DONE' };
    const successActions = [action1, action2];
    const requestAction = sendRequest('LOGIN', '', {}, successActions);
    const gen = defaultSendRequest(requestAction);

    gen.next();

    expect(
      gen.next({
        response: { success: true },
        timeout: undefined,
        cancelled: undefined,
      }).value,
    ).toEqual(put(requestComplete('LOGIN', '', { success: true })));

    expect(gen.next().value).toEqual(all([put(action1), put(action2)]));
  });
});
