import {
  arrayToObject,
  deleteProperties,
  reducerErrorToString,
  secondsToDigitalClockFormat,
} from '../../../app/redux/util/common';

describe('utilies used by reducers and selectors', () => {
  const users = [
    {
      id: '2',
      email: 'asd@asda.com',
      username: 'asdasda',
      password:
        'pbkdf2_sha256$100000$ltSnloM7x2C0$/9uNlTsdNCJ6iiHYi6oFTHC3wdKfULHtDBIQhN9Fx1g=',
    },
    {
      id: '3',
      email: 'asdasd@asdasd.com',
      username: 'asdasd',
      password:
        'pbkdf2_sha256$100000$3VyDhxvJYxJv$nYUrO+mhx3EatR5r/MR1tB5njKv3lyIi6Ws0iv17Rik=',
    },
    {
      id: '4',
      email: 'qweqwe@asdasd.com',
      username: 'qweqweqw',
      password:
        'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
    },
  ];

  it('should reduce array to object', () => {
    const actual = arrayToObject(users, 'id');
    const expected = {
      2: {
        id: '2',
        email: 'asd@asda.com',
        username: 'asdasda',
        password:
          'pbkdf2_sha256$100000$ltSnloM7x2C0$/9uNlTsdNCJ6iiHYi6oFTHC3wdKfULHtDBIQhN9Fx1g=',
      },
      3: {
        id: '3',
        email: 'asdasd@asdasd.com',
        username: 'asdasd',
        password:
          'pbkdf2_sha256$100000$3VyDhxvJYxJv$nYUrO+mhx3EatR5r/MR1tB5njKv3lyIi6Ws0iv17Rik=',
      },
      4: {
        id: '4',
        email: 'qweqwe@asdasd.com',
        username: 'qweqweqw',
        password:
          'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should reduce array to object', () => {
    const array = [
      ...users,
      {
        email: 'qweqwe@asdasd.com',
        username: 'qweqweqw',
        password:
          'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
      },
      {
        id: '6',
        email: 'qweqwe@asdasd.com',
        username: 'qweqweqw',
        password:
          'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
      },
    ];
    const actual = arrayToObject(array, 'id');
    const expected = {
      2: {
        id: '2',
        email: 'asd@asda.com',
        username: 'asdasda',
        password:
          'pbkdf2_sha256$100000$ltSnloM7x2C0$/9uNlTsdNCJ6iiHYi6oFTHC3wdKfULHtDBIQhN9Fx1g=',
      },
      3: {
        id: '3',
        email: 'asdasd@asdasd.com',
        username: 'asdasd',
        password:
          'pbkdf2_sha256$100000$3VyDhxvJYxJv$nYUrO+mhx3EatR5r/MR1tB5njKv3lyIi6Ws0iv17Rik=',
      },
      4: {
        id: '4',
        email: 'qweqwe@asdasd.com',
        username: 'qweqweqw',
        password:
          'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
      },
      6: {
        id: '6',
        email: 'qweqwe@asdasd.com',
        username: 'qweqweqw',
        password:
          'pbkdf2_sha256$100000$rWbIYIX9g8Db$8HOhQ/c8nkNT+lF2RNrJ1zkq3y3EebnRyjEiOkvRb8w=',
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should return new object with deleted properties', () => {
    const messages = {
      '-ad1': {
        message_id: 'a1',
      },
      a1: {
        message_id: 'a1',
        status: 'sending',
      },
      '-ad2': {
        message_id: 'a2',
      },
      a2: {
        message_id: 'a2',
        status: 'sending',
      },
      a3: {
        message_id: 'a3',
        status: 'sending',
      },
      a4: {
        message_id: 'a4',
        status: 'sending',
      },
      a5: {
        message_id: 'a5',
        status: 'sending',
      },
      '-ad5': {
        message_id: 'a5',
      },
    };
    const actual = deleteProperties(messages, ['a1', 'a2', 'a5', 'random_id']);
    const expected = {
      '-ad1': {
        message_id: 'a1',
      },
      '-ad2': {
        message_id: 'a2',
      },
      a3: {
        message_id: 'a3',
        status: 'sending',
      },
      a4: {
        message_id: 'a4',
        status: 'sending',
      },
      '-ad5': {
        message_id: 'a5',
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should convrt seconds to digital clock formatted string', () => {
    expect(secondsToDigitalClockFormat(1)).toEqual('00:00:01');
    expect(secondsToDigitalClockFormat(60)).toEqual('00:01:00');
    expect(secondsToDigitalClockFormat(120)).toEqual('00:02:00');
    expect(secondsToDigitalClockFormat(120)).toEqual('00:02:00');
    expect(secondsToDigitalClockFormat(86399)).toEqual('23:59:59');
    expect(secondsToDigitalClockFormat(86400)).toEqual('00:00:00');
    expect(secondsToDigitalClockFormat(172800)).toEqual('00:00:00');
    expect(secondsToDigitalClockFormat(86401)).toEqual('00:00:01');
    expect(secondsToDigitalClockFormat(90000)).toEqual('01:00:00');
    expect(secondsToDigitalClockFormat(3600)).toEqual('01:00:00');
  });

  it('force fail', () => {
    const actual = reducerErrorToString({}, '');

    expect(actual).toEqual('Fail');
  });
});
