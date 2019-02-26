export const START_DUMMY_SUBSCRIPTION = 'START_DUMMY_SUBSCRIPTION';
export const STOP_DUMMY_SUBSCRIPTION = 'STOP_DUMMY_SUBSCRIPTION';
export const SUBSCRIPTION_ERROR = 'SUBSCRIPTION_ERROR';
export const PONG = 'PONG';

export const startDummySubscription = () => ({
  type: START_DUMMY_SUBSCRIPTION,
});

export const stopDummySubscription = () => ({
  type: STOP_DUMMY_SUBSCRIPTION,
});

export const subscriptionError = (error: any) => ({
  type: SUBSCRIPTION_ERROR,
  payload: {
    error,
  },
});

export const pong = () => ({
  type: PONG,
});
