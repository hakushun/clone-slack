import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { UserInfo } from './users';

export type Message = {
  id: string;
  timestamp: number;
  user: {
    id: string;
    username: string;
    avatarURL: string;
  };
  content?: string;
  imageURL?: string;
};
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
  [
    (state: RootState) => state.resources.messages.messages,
    (state: RootState) => state.ui.search.search,
  ],
  (messages, search) => {
    if (search === '') return messages;
    const regex = new RegExp(search, 'gi');
    return messages.reduce((acc: Message[], message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.username.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
  },
);

export const selectJoinedUsers = createSelector(
  [(state: RootState) => state.resources.messages.messages],
  (messages) =>
    // bug: avatarURLが違うと同一ユーザーでもpushされてしまう
    messages.reduce((acc: UserInfo[], message) => {
      if (!acc.includes(message.user)) {
        acc.push(message.user);
      }
      return acc;
    }, []),
);
