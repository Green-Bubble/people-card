import { put, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware, { runSaga } from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import 'jest';
import {
  ActionType,
  fetchPeopleFailure,
  fetchPeopleLoading,
  fetchPeopleRequest,
  fetchPeopleSuccess,
} from '../actions/people';
import * as api from '../../services/fetchPeople';
import { fetchPeopleSaga, rootSaga } from '../sagas';
import { AnyAction, applyMiddleware, compose } from 'redux';
import store from '../index';
import rootReducer from '../reducers';

const SAMPLE_DATA = Array(10).fill(1);

describe('SagaTest', () => {
  const genObject = rootSaga();
  it('rootSaga Test', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ActionType.FETCH_PEOPLE_REQUEST, fetchPeopleSaga),
    );
  });

  it('rootSaga is done', () => {
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action', async () => {
    const requestPeople = jest
      .spyOn(api, 'fetchPeopleService')
      .mockImplementation(() => Promise.resolve(SAMPLE_DATA));

    const dispatched: AnyAction[] = [];
    await runSaga(
      {
        dispatch: (action: AnyAction) => dispatched.push(action),
      },
      fetchPeopleSaga,
    );

    expect(requestPeople).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      fetchPeopleLoading(true),
      fetchPeopleSuccess(SAMPLE_DATA),
      fetchPeopleLoading(false),
    ]);
    requestPeople.mockClear();
  });

  it('should call api and dispatch error action', async () => {
    const requestPeople = jest
      .spyOn(api, 'fetchPeopleService')
      .mockImplementation(() => Promise.reject(new Error('Network Error')));
    const dispatched: AnyAction[] = [];
    await runSaga(
      {
        dispatch: (action: AnyAction) => dispatched.push(action),
      },
      fetchPeopleSaga,
    );

    expect(requestPeople).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      fetchPeopleLoading(true),
      fetchPeopleFailure('Network Error'),
      fetchPeopleLoading(false),
    ]);
    requestPeople.mockClear();
  });

  it('check fetchPeopleSaga using rootSaga', async () => {
    const requestPeople = jest
      .spyOn(api, 'fetchPeopleService')
      .mockImplementation(() => Promise.resolve(SAMPLE_DATA));

    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureMockStore([sagaMiddleware]);
    const store = mockStore({});
    sagaMiddleware.run(rootSaga);
    store.dispatch(fetchPeopleRequest());
    await Promise.resolve();

    const expectedActions = [
      fetchPeopleRequest(),
      fetchPeopleLoading(true),
      fetchPeopleSuccess(SAMPLE_DATA),
      fetchPeopleLoading(false),
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(requestPeople).toHaveBeenCalledTimes(1);

    requestPeople.mockClear();
  });
});
