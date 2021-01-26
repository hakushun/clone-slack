import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';
import channels from './channels';
import messages from './messages';
import search from './search';

const rootReducer = combineReducers({
  resources: combineReducers({ channels, messages }),
  ui: combineReducers({ user, modal, channel, search }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
