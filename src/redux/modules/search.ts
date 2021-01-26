import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type Search = {
  search: string;
};

const actionCreator = actionCreatorFactory();

export const searchMessage = actionCreator<Search>('SEARCH_MESSAGE');

const INITIAL_STATE: Search = { search: '' };

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  searchMessage,
  (state, payload) => ({
    ...state,
    ...payload,
  }),
);

export default reducer;

export const selectSearch = createSelector(
  [(state: RootState) => state.ui.search],
  (search) => search,
);
