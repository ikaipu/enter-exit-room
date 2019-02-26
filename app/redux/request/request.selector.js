const getRequestStore = state => state.requestStore;

export const selectRequestObject = (state: Object, key: string, id: string) => {
  const store = getRequestStore(state);

  try {
    if (store[key][id]) {
      return store[key][id];
    }

    return {
      sending: false,
      error: false,
      success: false,
      message: '',
      response: null,
    };
  } catch (err) {
    return {
      sending: false,
      error: false,
      success: false,
      message: '',
      response: null,
    };
  }
};
