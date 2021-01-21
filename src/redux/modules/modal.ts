import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleChannelForm = actionCreator<boolean>('TOGGLE_CHANNEL_FORM');

const INITIAL_STATE: {
  channleForm: boolean;
} = {
  channleForm: false,
};

const reducer = reducerWithInitialState(INITIAL_STATE).case(
  toggleChannelForm,
  (state, payload) => ({
    ...state,
    channleForm: payload,
  }),
);

export default reducer;

export const selectChannelForm = createSelector(
  [(state: RootState) => state.ui.modal.channleForm],
  (channleForm) => channleForm,
);
