import { ENTER_ROOM, EXIT_ROOM } from './room.action';

const initialState = {
  roomId: null,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case ENTER_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    case EXIT_ROOM:
      return initialState;
    default:
      return state;
  }
};
