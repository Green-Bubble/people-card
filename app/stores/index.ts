import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  enhancers: [composeWithDevTools],
});
sagaMiddleware.run(rootSaga);

export default store;
