import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';
import channels from './channels';

const rootReducer = combineReducers({
  resources: combineReducers({ channels }),
  ui: combineReducers({ user, modal, channel }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
