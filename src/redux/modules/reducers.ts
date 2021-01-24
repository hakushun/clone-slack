import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';
import channels from './channels';
import messages from './messages';

const rootReducer = combineReducers({
  resources: combineReducers({ channels, messages }),
  ui: combineReducers({ user, modal, channel }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
