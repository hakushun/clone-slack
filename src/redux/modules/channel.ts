import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type Channel = {
  id: string;
  name: string;
  description: string;
  createdBy: {
    username: string;
    avatarURL: string;
  };
};

const actionCreator = actionCreatorFactory();

export const focusChannel = actionCreator<Channel>('FOCUS_CHANNEL');

const INITIAL_STATE: Channel = {
  id: '',
  name: '',
  description: '',
  createdBy: {
    username: '',
    avatarURL: '',
  },
};

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  focusChannel,
  (state, payload) => ({
    ...state,
    ...payload,
  }),
);

export default reducer;

export const selectChannel = createSelector(
  [(state: RootState) => state.ui.channel],
  (channel) => channel,
);
