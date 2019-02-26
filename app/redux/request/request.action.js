export const DEBOUNCE_REQUEST = 'DEBOUNCE_REQUEST';
export const SEND_REQUEST = 'SEND_REQUEST';
export const SEND_REQUEST_AWAIT = 'SEND_REQUEST_AWAIT';
export const SEND_REQUEST_LATEST = 'SEND_REQUEST_LATEST';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const DISMISS_RESULT = 'DISMISS_RESULT';

export const debounceRequest = (
  key: string,
  id: string,
  params: Object,
  successAction?: Object | Object[],
  failureAction?: Object | Object[],
) => ({
  type: DEBOUNCE_REQUEST,
  payload: {
    key,
    id,
    params,
    successAction,
    failureAction,
  },
});

export const sendRequest = (
  key: string,
  id: string,
  params: Object,
  successAction?: Object | Object[],
  failureAction?: Object | Object[],
) => ({
  type: SEND_REQUEST,
  payload: {
    key,
    id,
    params,
    successAction,
    failureAction,
  },
});

export const sendRequestLatest = (
  key: string,
  id: string,
  params: Object,
  successAction?: Object | Object[],
  failureAction?: Object | Object[],
) => ({
  type: SEND_REQUEST_LATEST,
  payload: {
    key,
    id,
    params,
    successAction,
    failureAction,
  },
});

/*
 * does not fetch the request if the same request is still being fetched;
 * uniqueness is based on `key` and `id` parameters;
 * in case of dispatching sendRequestAwait('SOME_KEY', 'some_id') multiple times,
 * while the first is executed, the next ones will be ignored
 */
export const sendRequestAwait = (
  key: string,
  id: string,
  params: Object,
  successAction?: Object | Object[],
  failureAction?: Object | Object[],
) => ({
  type: SEND_REQUEST_AWAIT,
  payload: {
    key,
    id,
    params,
    successAction,
    failureAction,
  },
});

export const cancelRequest = (key: string, id: string) => ({
  type: CANCEL_REQUEST,
  payload: {
    key,
    id,
  },
});

export const requestError = (key: string, id: string, error: any) => ({
  type: REQUEST_ERROR,
  payload: {
    key,
    id,
    error,
  },
});

export const requestComplete = (key: string, id: string, response: any) => ({
  type: REQUEST_COMPLETE,
  payload: {
    key,
    id,
    response,
  },
});

export const dismissResult = (key: string, id: string) => ({
  type: DISMISS_RESULT,
  payload: {
    key,
    id,
  },
});
