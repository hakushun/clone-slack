import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type Presences = {
  [uid: string]: boolean;
};

const actionCreator = actionCreatorFactory();

export const setPresences = actionCreator<Presences>('SET_PRESENCES');

const INITIAL_STATE: Presences = {};

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  setPresences,
  (state, payload) => ({
    ...state,
    ...payload,
  }),
);

export default reducer;

export const selectPresences = createSelector(
  [(state: RootState) => state.resources.presences],
  (presences) => Object.keys(presences),
);
