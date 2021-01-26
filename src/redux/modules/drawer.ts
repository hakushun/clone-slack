import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleMetaInfo = actionCreator<boolean>('TOGGLE_METAINFO');

const INITIAL_STATE: { metaInfo: boolean } = { metaInfo: false };

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  toggleMetaInfo,
  (state, payload) => ({
    ...state,
    metaInfo: payload,
  }),
);

export default reducer;

export const selectMetaInfo = createSelector(
  [(state: RootState) => state.ui.drawer.metaInfo],
  (metaInfo) => metaInfo,
);
