export const DEBOUNCE_REQUEST = 'DEBOUNCE_REQUEST';
export const SEND_REQUEST = 'SEND_REQUEST';
export const SEND_REQUEST_AWAIT = 'SEND_REQUEST_AWAIT';
export const SEND_REQUEST_LATEST = 'SEND_REQUEST_LATEST';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const DISMISS_RESULT = 'DISMISS_RESULT';

/*
 * Does not fetch the request right away after being dispatched;
 * uniqueness is based on `key` and `id` parameters;
 *
 * The most common use of this action is if a user types in the search bar,
 * the search request will not be executed while the user is still typing.
 *
 * The time interval between key presses can be changed in `debounceTimeoutSeconds` src/config/settings.js
 */
export const debounceRequest = (
  key: string,
  id: string,
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route: string,
    params: Object,
  },
  options?: {
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
    responseActionName?: string,
  },
) => ({
  type: DEBOUNCE_REQUEST,
  payload: {
    key,
    id,
    request,
    options,
  },
});

/*
 * Executes the request on every dispatch;
 * uniqueness is based on `key` and `id` parameters;
 */
export const sendRequest = (
  key: string,
  id: string,
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route: string,
    params: Object,
  },
  options?: {
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
    responseActionName?: string,
  },
) => ({
  type: SEND_REQUEST,
  payload: {
    key,
    id,
    request,
    options,
  },
});

/*
 * Executes the request on every dispatch;
 * uniqueness is based on `key` and `id` parameters;
 * For every dispatch, all previous requests will be cancelled.
 *
 * ex: sendRequestLatest is dispatch twice, the first will be cancelled if it is not yet done.
 */
export const sendRequestLatest = (
  key: string,
  id: string,
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route: string,
    params: Object,
  },
  options?: {
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
    responseActionName?: string,
  },
) => ({
  type: SEND_REQUEST_LATEST,
  payload: {
    key,
    id,
    request,
    options,
  },
});

/*
 * does not fetch the request if the same request is still being fetched;
 * uniqueness is based on `key` and `id` parameters;
 * in case of dispatching sendRequestAwait('SOME_KEY', 'some_id') multiple times,
 * while the first is executed, the next ones will be ignored
 *
 * The most common use for this action is if the user presses the login button multiple times,
 * the request will only be called once or until it is done.
 */
export const sendRequestAwait = (
  key: string,
  id: string,
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route: string,
    params: Object,
  },
  options?: {
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
    responseActionName?: string,
  },
) => ({
  type: SEND_REQUEST_AWAIT,
  payload: {
    key,
    id,
    request,
    options,
  },
});

/*
 * use this to cancel a request with the same key and id
 */
export const cancelRequest = (key: string, id: string) => ({
  type: CANCEL_REQUEST,
  payload: {
    key,
    id,
  },
});

/*
 * use this to dispatch an error
 */
export const requestError = (key: string, id: string, error: any) => ({
  type: REQUEST_ERROR,
  payload: {
    key,
    id,
    error,
  },
});

/*
 * call this when the request is done
 */
export const requestComplete = (key: string, id: string, response: any) => ({
  type: REQUEST_COMPLETE,
  payload: {
    key,
    id,
    response,
  },
});

/*
 * use this to dismiss a request's result and/or error
 */
export const dismissResult = (key: string, id: string) => ({
  type: DISMISS_RESULT,
  payload: {
    key,
    id,
  },
});
