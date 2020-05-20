import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import stateReducers from "./stateReducers";
import calandarReducer from "./calanderReducers";

const rootRdeucers = combineReducers({
  auth: stateReducers,
  calandar:calandarReducer
});

let store = createStore(rootRdeucers, applyMiddleware(thunk));
export default store;
