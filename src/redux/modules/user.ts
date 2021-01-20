import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type User = {
  isAuth: boolean;
  id: string;
  username: string;
  avatarURL: string;
};
type AuthUser = {
  id: string;
  username: string;
  avatarURL: string;
} | null;

const actionCreator = actionCreatorFactory();
export const authUser = actionCreator<AuthUser>('AUTH_USER');
export const logoutUser = actionCreator('LOGOUT_USER');

const INITIAL_STATE: User = {
  isAuth: false,
  id: '',
  username: '',
  avatarURL: '',
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(authUser, (state, payload) => {
    if (!payload) return { ...INITIAL_STATE };
    return {
      ...state,
      isAuth: true,
      ...payload,
    };
  })
  .case(logoutUser, () => ({ ...INITIAL_STATE }));

export default reducer;

export const selectIsAuth = createSelector(
  [(state: RootState) => state.ui.user.isAuth],
  (isAuth) => isAuth,
);

export const selectUser = createSelector(
  [(state: RootState) => state.ui.user],
  (user) => user,
);
