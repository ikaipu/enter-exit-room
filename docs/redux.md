# Redux

[<navigation](navigation.md) - [home](index.md) - [data persistence>](persistence.md)

Please read [Redux](https://redux.js.org/) docs.

## Actions

```
const INCREMENT = 'INCREMENT';

const increment = (value: number) => ({
  type: INCREMENT,
  payload: {
    value,
  },
})
```

## Reducers

Your reducers must be pure (deterministic). Given the same state and event (action with same payload), the result is always predictable.

Calling `increment(1)` with the current state `{ count: 5 }` will always return `{ count: 6 }`

```
const initialState = {
  count: 0,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload.value,
      };
    default:
      return state;
  }
};

```

## Handling arrays

It is our convention to store arrays from api response as an object using the ids as keys.

```
import { arrayToObject } from '../app/redux/util/common';

const initialState = {
  jobs: {},
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case 'JOBS_RESPONSE':
      return {
        ...state,
        jobs: arrayToObject(
          action.payload.response,
          'id',
        ),
      };
    default:
      return state;
  }
};

```

## Testing redux

A reducer from `app/redux/demo/demo.reducer.js` should have tests in `__tests__/redux/demo/demo.reducer.test.js`.

Assuming the value of `count` in the store is `5`, dispatching `increment(2)` should update `count` to `7`.

```
import reducer from '../../../app/redux/demo/demo.reducer';
import { increment } from '../../../app/redux/demo/demo.action';

describe('demo tests', () => {
  it('should increment', () => {
    const action = increment(2);

    const actual = reducer({ count: 5 }, action);

    expect(actual).toEqual({
      count: 7,
    });
  });
});
```
