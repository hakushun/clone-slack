import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { toggleChangeAvatarForm } from './modal';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleAccountMenu = actionCreator<boolean>('TOGGLE_ACCOUT_MENU');

const INITIAL_STATE: {
  accountMenu: boolean;
} = {
  accountMenu: false,
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggleAccountMenu, (state, payload) => ({
    ...state,
    accountMenu: payload,
  }))
  .case(toggleChangeAvatarForm, (state) => ({
    ...state,
    accountMenu: false,
  }));

export default reducer;

export const selectAccountMenu = createSelector(
  [(state: RootState) => state.ui.dropdown.accountMenu],
  (accountMenu) => accountMenu,
);
