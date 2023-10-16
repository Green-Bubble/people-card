import rootReducer from '../reducers';

import { fetchPeopleLoading, fetchPeopleSuccess } from '../actions/people';
import { configureStore } from '@reduxjs/toolkit';

const SAMPLE_DATA = Array(10).fill(1);
describe('PeopleAction', () => {
  test('fetchPeopleSuccess', () => {
    const store = configureStore({
      reducer: rootReducer,
    });
    store.dispatch(fetchPeopleSuccess(SAMPLE_DATA));

    const { data } = store.getState().people;
    expect(data).toStrictEqual(SAMPLE_DATA.slice());
  });
  test('fetchPeopleLoading', () => {
    const store = configureStore({
      reducer: rootReducer,
    });
    store.dispatch(fetchPeopleLoading(true));

    const { loading } = store.getState().people;
    expect(true).toBe(loading);
  });
});
