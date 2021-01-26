import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';
import drawer from './drawer';
import users from './users';
import channels from './channels';
import messages from './messages';
import search from './search';

const rootReducer = combineReducers({
  ui: combineReducers({ user, modal, channel, search }),
  resources: combineReducers({ users, channels, messages, presences }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
