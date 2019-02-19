import { selectRequestObject } from '../../../app/redux/request/request.selector';

describe('request selector tests', () => {
  it('should ', () => {
    expect({
      sending: false,
      error: false,
      response: null,
      message: '',
      success: false,
    }).toEqual(selectRequestObject({}, 'LOGIN', ''));

    expect({
      sending: false,
      error: false,
      response: null,
      message: '',
      success: false,
    }).toEqual(selectRequestObject({ TEST: {} }, 'LOGIN', ''));

    expect({
      sending: true,
      error: false,
      response: null,
      message: '',
      success: false,
    }).toEqual(
      selectRequestObject(
        {
          requestStore: {
            USER: {
              abc123: {
                sending: true,
                error: false,
                response: null,
                message: '',
                success: false,
              },
            },
          },
        },
        'USER',
        'abc123',
      ),
    );
  });
});
