import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import darkModeReducer from "./reducers/darkModeReducer";

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
