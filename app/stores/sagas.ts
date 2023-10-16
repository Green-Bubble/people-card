import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchPeopleService } from "../services/fetchPeople";
import {
  ActionType,
  fetchPeopleFailure,
  fetchPeopleLoading,
  fetchPeopleSuccess,
} from "./actions/people";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchPeopleSaga() {
  try {
    yield put(fetchPeopleLoading(true));
    const user = yield call(fetchPeopleService);
    yield put(fetchPeopleSuccess(user));
  } catch (e) {
    yield put(fetchPeopleFailure(e.message));
  } finally {
    yield put(fetchPeopleLoading(false));
  }
}

export function* rootSaga() {
  yield takeEvery(ActionType.FETCH_PEOPLE_REQUEST, fetchPeopleSaga);
}

export default rootSaga;
