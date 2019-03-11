# Selectors

[<data persistence](persistence.md) - [home](index.md) - [sagas>](saga.md)

Please read [Reselect](https://github.com/reduxjs/reselect) github page.

Selectors are functions that take Redux state as an argument and return some data to pass to the component.

`selector`

```
const selectMyUserId = state => state.authStore.userId;

const selectTodo = (state: Object, id: string) => state.todoStore.todos[id];
```

`component`

```
const mapStateToProps = (state, props) => ({
  todo: selectTodo(state, props.navigation.state.params.selectedId),
});
```

## memoized selectors

In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

```
// app/redux/todo/todo.selector.js
import { createSelector } from 'reselect';

const selectTodos = state => state.todoStore.todos;

const selectTodosArray = createSelector(
  [selectTodos],
  todos => Object.values(todos)
);

export const selectCompletedTodos = createSelector(
  [selectTodosArray],
  todos => todos.filter(todo => todo.type === 'completed'),
);
```

## when to use memoized selectors?

When getting data from collections like arrays and large objects. Examples are when using array map, filter, reduce, etc. and Object.values().

## when to use normal selectors?

When getting a property of an object in the store.

## Testing selectors

```
import {
  availableJobs,
} from '../../../app/redux/todo/todo.selector';

describe('job selector tests', () => {
  it('should return array of available jobs', () => {
    const jobs = {
      1: {
        id: '1',
        state: 'AV',
      },
      3: {
        id: '3',
        state: 'AV',
      },
      2: {
        id: '2',
        state: 'CP',
      },
    };

    expect(availableJobs.resultFunc(jobs)).toEqual([
      {
        id: '1',
        state: 'AV',
      },
      {
        id: '3',
        state: 'AV',
      },
    ]);
  });
});

```
