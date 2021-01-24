import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Message } from './message';

export type Messages = Message[];

const actionCreator = actionCreatorFactory();

export const setMessages = actionCreator<Messages>('SET_MESAGGES');

const INITIAL_STATE: { messages: Messages } = { messages: [] };

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  setMessages,
  (state, payload) => ({
    ...state,
    messages: [...payload],
  }),
);

export default reducer;

export const selectMessages = createSelector(
  [(state: RootState) => state.resources.messages.messages],
  (messages) => messages,
);
