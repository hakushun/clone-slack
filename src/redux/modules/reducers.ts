import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import channel from './channel';
import drawer from './drawer';
import accordion from './accordion';
import dropdown from './dropdown';
import users from './users';
import channels from './channels';
import messages from './messages';
import presences from './presences';
import search from './search';

const rootReducer = combineReducers({
  resources: combineReducers({ users, channels, messages, presences }),
  ui: combineReducers({
    user,
    modal,
    channel,
    search,
    drawer,
    accordion,
    dropdown,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
