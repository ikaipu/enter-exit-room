import { REHYDRATE_COMPLETE, INITIALIZED, LOG_OUT } from './app.action';

const initialState = {
  rehydrated: false,
  initialized: false,
  wasLoggedOut: false,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...initialState,
        initialized: true,
      };
    case REHYDRATE_COMPLETE:
      return {
        ...state,
        rehydrated: true,
      };
    case INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
