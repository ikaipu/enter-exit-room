export const ENTER_ROOM = 'ENTER_ROOM';
export const EXIT_ROOM = 'EXIT_ROOM';
export const ROOM_ACTION_ERROR = 'ROOM_ACTION_ERROR';

export const enterRoom = (roomId: string) => ({
  type: ENTER_ROOM,
  payload: {
    roomId,
  },
});

export const exitRoom = () => ({
  type: EXIT_ROOM,
});

export const roomActionError = (error: any) => ({
  type: ROOM_ACTION_ERROR,
  payload: {
    error,
  },
});
