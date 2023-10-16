import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { fetchPeopleSaga } from '../sagas';
import {
  fetchPeopleFailure,
  fetchPeopleLoading,
  fetchPeopleSuccess,
} from '../actions/people';
import { fetchPeopleService } from '../../services/fetchPeople';

const SAMPLE_DATA = Array(10).fill(1);

describe('When testing fetchPeopleSaga', () => {
  describe('Success FETCH', () => {
    const mySaga = sagaHelper(fetchPeopleSaga());

    mySaga('Should set isLoading as true', result => {
      expect(result).toEqual(put(fetchPeopleLoading(true)));
    });

    mySaga('Should call fetchPeopleService with success', result => {
      expect(result).toEqual(call(fetchPeopleService));

      return SAMPLE_DATA;
    });

    mySaga(
      'and then trigger an action with the people data we got from the API',
      result => {
        expect(result).toEqual(put(fetchPeopleSuccess(SAMPLE_DATA)));
      },
    );

    mySaga('and then trigger an action with the isLoading as false', result => {
      expect(result).toEqual(put(fetchPeopleLoading(false)));
    });

    mySaga('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });

  describe('Failed Fetch', () => {
    const mySaga = sagaHelper(fetchPeopleSaga());

    mySaga('Should set isLoading as true', result => {
      expect(result).toEqual(put(fetchPeopleLoading(true)));
    });

    mySaga('Should call fetchPeopleService with success', result => {
      expect(result).toEqual(call(fetchPeopleService));

      return new Error('Network error');
    });

    mySaga('and then trigger an action with failure', result => {
      expect(result).toEqual(put(fetchPeopleFailure('Network error')));
    });

    mySaga('and then trigger an action with the isLoading as false', result => {
      expect(result).toEqual(put(fetchPeopleLoading(false)));
    });

    mySaga('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
});
