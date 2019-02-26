import {
  PONG,
  START_DUMMY_SUBSCRIPTION,
  STOP_DUMMY_SUBSCRIPTION,
} from './dummy.action';

const initialState = {
  listening: false,
  count: 0,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case PONG:
      return {
        ...state,
        count: state.count + 1,
      };
    case START_DUMMY_SUBSCRIPTION:
      return {
        ...state,
        listening: true,
      };
    case STOP_DUMMY_SUBSCRIPTION:
      return {
        ...state,
        listening: false,
        count: 0,
      };
    default:
      return state;
  }
};
