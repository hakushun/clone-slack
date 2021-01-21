import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';

const rootReducer = combineReducers({
  resources: combineReducers({}),
  ui: combineReducers({ user, modal }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
