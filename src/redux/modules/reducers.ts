import { combineReducers } from 'redux';
import user from './user';

const rootReducer = combineReducers({
  resources: combineReducers({}),
  ui: combineReducers({ user }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
