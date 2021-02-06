import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type Channel = {
  id: string;
  name: string;
  description?: string;
  createdBy?: {
    username: string;
    avatarURL: string;
  };
  isPrivate: boolean;
};

const actionCreator = actionCreatorFactory();

export const focusPublicChannel = actionCreator<Channel>(
  'FOCUS_PUBLIC_CHANNEL',
);
export const focusPrivateChannel = actionCreator<Channel>(
  'FOCUS_PRIVATE_CHANNEL',
);

const INITIAL_STATE: Channel = {
  id: '',
  name: '',
  description: '',
  createdBy: {
    username: '',
    avatarURL: '',
  },
  isPrivate: false,
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(focusPublicChannel, (_state, payload) => ({
    ...payload,
    isPrivate: false,
  }))
  .case(focusPrivateChannel, (_state, payload) => ({
    ...payload,
    isPrivate: true,
  }));

export default reducer;

export const selectChannel = createSelector(
  [(state: RootState) => state.ui.channel],
  (channel) => channel,
);

export const selectIsPrivate = createSelector(
  [(state: RootState) => state.ui.channel.isPrivate],
  (isPrivate) => isPrivate,
);
