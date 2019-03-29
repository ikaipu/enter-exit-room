# Saga

[<selectors](selectors.md) - [home](index.md) - [testing>](testing.md)

Please read about [Generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

Please read [Redux Saga](https://redux-saga.js.org/) docs.

## waiting for a promise

```
const somePromise = () =>
  new Promise((resolve, reject) => {
    const shouldNotFail = Math.random() >= 0.5;

    setTimeout(() => {
      if (shouldNotFail) {
        resolve({ success: true });
      } else {
        reject(new Error('Dummy'));
      }
    }, 2000);
  });

function* someGenerator(): Generator<*, *, *> {
  try {
    const response = yield somePromise();
    yield console.log(response);
  } catch (err) {
    yield console.log(err);
  }
}
```

## race between response, timeout and cancellation

```
export default function* sendRequest(): Generator<*, *, *> {
  try {
    const { response, timeout, cancelled } = yield race({
      response: call(dummyApiRequest),
      timeout: delay(customTimeoutSeconds * 1000),
      cancelled: call(CANCEL_ACTION, action),
    });

    if (cancelled) {
      return;
    }

    if (timeout) {
      yield console.log('Request timeout');

      return;
    }

    yield console.log(response);
  } catch (err) {
    yield console.log(err);
  }
}
```

## `take` with conditional payload

```
function* shouldCancel(actionParam: Object) {
  let notFound = true;

  while (notFound) {
    const action = yield take(CANCEL_REQUEST);

    if (action.payload.id === actionParam.payload.id) {
      notFound = false;
    }
  }

  return true;
}

export default function* sendRequest(): Generator<*, *, *> {
  try {
    const { response, timeout, cancelled } = yield race({
      response: call(dummyApiRequest),
      timeout: delay(timeoutSeconds * 1000),
      cancelled: call(shouldCancel, action),
    });

    if (cancelled) {
      return;
    }

    if (timeout) {
      yield console.log('Request timeout');

      return;
    }

    yield console.log(response);

  } catch (err) {
    yield console.log(err);
  }
}
```

## subscribing to listeners

`eventChannel` callback should return unsubscribe function, in this case we return `clearInterval(timer);`

```
import { eventChannel } from 'redux-saga';
import { race, take } from 'redux-saga/effects';

import {
  STOP_DUMMY_SUBSCRIPTION,
} from './dummy.action';

const startDummySubscriptionChannel = () =>
  eventChannel((emitter: Function) => {
    const timer = setInterval(() => {
      emitter('emit anything here');
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  });

export function* watchSubscription(): Generator<*, *, *> {
  const channel = startDummySubscriptionChannel();

  while (true) {
    try {
      const { emittedByListener, stopSubscription } = yield race({
        emittedByListener: take(channel),
        stopSubscription: take(STOP_DUMMY_SUBSCRIPTION),
      });

      if (stopSubscription) {
        channel.close();
        break;
      }

      yield console.log(emittedByListener);
    } catch (err) {
      yield console.log(err);
    }
  }
}

```

## Testing saga

[request.saga.test.js](../__tests__/redux/request/request.saga.test.js)

- TODO
