"use client"; // 👈 use it here

import PeopleCards from "./components/PeopleCards";
import { Provider as ReduxProvider } from "react-redux";
import store from "./stores";

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <PeopleCards />
    </ReduxProvider>
  );
}
