import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

export type Keys = 'about' | 'members';
type Accordion = {
  // eslint-disable-next-line no-unused-vars
  [K in Keys]: boolean;
};
const actionCreator = actionCreatorFactory();

export const toggleAccordion = actionCreator<Keys>('TOGGLE_ACCORDION');

const INITIAL_STATE: Accordion = {
  about: false,
  members: false,
};

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  toggleAccordion,
  (state, payload) => ({
    ...state,
    [payload]: !state[payload],
  }),
);

export default reducer;

export const selectAboutIsOpened = createSelector(
  [(state: RootState) => state.ui.accordion.about],
  (accordion) => accordion,
);

export const selectMembersIsOpened = createSelector(
  [(state: RootState) => state.ui.accordion.members],
  (accordion) => accordion,
);
