import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type UserInfo = {
  id: string;
  username: string;
  avatarURL: string;
  online?: boolean;
};
export type Users = { users: UserInfo[] };

const actionCreator = actionCreatorFactory();

export const setUsers = actionCreator<UserInfo[]>('SET_USERS');

const INITIAL_STATE: Users = { users: [] };

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  setUsers,
  (state, payload) => ({
    ...state,
    users: [...payload],
  }),
);

export default reducer;

export const selectUsers = createSelector(
  [
    (state: RootState) => state.resources.users.users,
    (state: RootState) => state.resources.presences,
  ],
  (users, presences) =>
    users.map((user) => {
      if (Object.keys(presences).includes(user.id)) {
        user.online = true;
        return user;
      }
      user.online = false;
      return user;
    }),
);
