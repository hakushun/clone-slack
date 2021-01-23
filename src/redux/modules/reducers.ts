import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';

const rootReducer = combineReducers({
  resources: combineReducers({}),
  ui: combineReducers({ user, modal, channel }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
