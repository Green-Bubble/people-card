import { PeopleState } from "../../models/root_state";
import { ActionType } from "../actions/people";
import { AnyAction } from "redux";

const preloadedState: PeopleState = {
  data: [],
  error: "",
  loading: false,
};
const peopleReducer = (state = preloadedState, action: AnyAction) => {
  switch (action.type as ActionType) {
  case ActionType.FETCH_PEOPLE_SUCCESS:
    return { ...state, data: action.payload };
  case ActionType.FETCH_PEOPLE_FAILURE:
    return { ...state, error: action.payload };
  case ActionType.FETCH_PEOPLE_LOADING:
    return { ...state, loading: action.payload };
  default:
    return state;
  }
};
export default peopleReducer;
