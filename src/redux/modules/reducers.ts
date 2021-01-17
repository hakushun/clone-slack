import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  resources: combineReducers({}),
  ui: combineReducers({}),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
