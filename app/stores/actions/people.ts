import { People } from '../../models/people';

export enum ActionType {
  FETCH_PEOPLE_REQUEST = 'FETCH_PEOPLE_REQUEST',
  FETCH_PEOPLE_LOADING = 'FETCH_PEOPLE_LOADING',
  FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS',
  FETCH_PEOPLE_FAILURE = 'FETCH_PEOPLE_FAILURE',
}
export const fetchPeopleRequest = () => ({
  type: ActionType.FETCH_PEOPLE_REQUEST,
});
export const fetchPeopleSuccess = (peoples: People[]) => ({
  type: ActionType.FETCH_PEOPLE_SUCCESS,
  payload: peoples,
});
export const fetchPeopleFailure = (msg: string) => ({
  type: ActionType.FETCH_PEOPLE_FAILURE,
  payload: msg,
});

export const fetchPeopleLoading = (isLoading: boolean) => ({
  type: ActionType.FETCH_PEOPLE_LOADING,
  payload: isLoading,
});
