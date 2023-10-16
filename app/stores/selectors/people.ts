import { RootState } from "../../models/root_state";
import { useSelector } from "react-redux";

export const usePeoples = () => {
  return useSelector((state: RootState) => state.people.data);
};
export const useError = () => {
  return useSelector((state: RootState) => state.people.error);
};
export const useIsLoading = () => {
  return useSelector((state: RootState) => state.people.loading);
};
