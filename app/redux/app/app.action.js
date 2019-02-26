export const REHYDRATE_COMPLETE = 'REHYDRATE_COMPLETE';
export const INITIALIZED = 'INITIALIZED';
export const LOG_OUT = 'LOG_OUT';

export const rehydrateComplete = () => ({
  type: REHYDRATE_COMPLETE,
});

export const initialized = () => ({
  type: INITIALIZED,
});

export const logOut = () => ({
  type: LOG_OUT,
});
