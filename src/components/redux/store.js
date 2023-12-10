import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { addgetContact } from './reduseContact';

const rootReducer = combineReducers({
  addgetContact,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
