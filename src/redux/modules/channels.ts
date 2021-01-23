import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Channel } from './channel';

export type Channels = Channel[];

const actionCreator = actionCreatorFactory();

export const setChannels = actionCreator<Channels>('SET_CHANNELS');

const INITIAL_STATE: { channels: Channels } = { channels: [] };

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  setChannels,
  (state, payload) => ({
    ...state,
    channels: [...payload],
  }),
);

export default reducer;

export const selectChannels = createSelector(
  [(state: RootState) => state.resources.channels.channels],
  (channels) => channels,
);
