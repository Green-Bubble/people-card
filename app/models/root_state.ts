import { People } from "./people";

export interface PeopleState {
  data: People[];
  error: string;
  loading: boolean;
}

export interface RootState {
  people: PeopleState;
}
