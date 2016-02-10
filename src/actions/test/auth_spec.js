import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  login,
  AUTH,
  AUTH_SUCCESS
} from '../auth';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });
  it('logs in', (done) => {

    const username = 'abc';
    const password = '123';

    const authPayload = {
      username
    };

    const authSuccessPayload = {
      token: '123',
      username
    };

    const routerPayload = {
      arg: '/',
      method: 'push'
    };

    const expectedActions = [{
      type: AUTH,
      payload: authPayload
    }, {
      type: AUTH_SUCCESS,
      payload: authSuccessPayload
    }, {
      type: '@@router/TRANSITION',
      payload: routerPayload
    }];

    const store = mockStore({

    }, expectedActions, done);

    store.dispatch(login({username, password}));

  });
});
