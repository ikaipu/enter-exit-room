import { reducerErrorToString } from '../util/common';
import messages from './request.constants';
import {
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
  CANCEL_REQUEST,
  REQUEST_ERROR,
  REQUEST_COMPLETE,
  DISMISS_RESULT,
} from './request.action';
// import { LOG_OUT } from '../app/app.action';

const initialState = {};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    // case LOG_OUT:
    //   return initialState;
    case SEND_REQUEST:
    case SEND_REQUEST_AWAIT:
    case SEND_REQUEST_LATEST:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            sending: true,
            error: false,
            success: false,
            message: messages[action.payload.key].loaderMessage,
          },
        },
      };
    case REQUEST_COMPLETE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            sending: false,
            error: false,
            success: true,
            message: messages[action.payload.key].successMessage,
          },
        },
      };
    case REQUEST_ERROR:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            sending: false,
            error: true,
            success: false,
            message: reducerErrorToString(
              action.payload.error,
              messages[action.payload.key].defaultErrorMessage,
            ),
          },
        },
      };
    case CANCEL_REQUEST:
    case DISMISS_RESULT:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            sending: false,
            error: false,
            success: false,
            message: '',
          },
        },
      };
    default:
      return state;
  }
};
