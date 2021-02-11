import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleChannelForm = actionCreator<boolean>('TOGGLE_CHANNEL_FORM');
export const toggleUploadMediaForm = actionCreator<boolean>(
  'TOGGLE_UPLOAD_MEDIA_FORM',
);
export const toggleChangeAvatarForm = actionCreator<boolean>(
  'TOGGLE_CHANGE_AVATAR_FORM',
);

const INITIAL_STATE: {
  channleForm: boolean;
  uploadMediaForm: boolean;
  changeAvatarForm: boolean;
} = {
  channleForm: false,
  uploadMediaForm: false,
  changeAvatarForm: false,
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggleChannelForm, (state, payload) => ({
    ...state,
    channleForm: payload,
  }))
  .case(toggleUploadMediaForm, (state, payload) => ({
    ...state,
    uploadMediaForm: payload,
  }))
  .case(toggleChangeAvatarForm, (state, payload) => ({
    ...state,
    changeAvatarForm: payload,
  }));

export default reducer;

export const selectChannelForm = createSelector(
  [(state: RootState) => state.ui.modal.channleForm],
  (channleForm) => channleForm,
);

export const selectUploadMediaForm = createSelector(
  [(state: RootState) => state.ui.modal.uploadMediaForm],
  (uploadMediaForm) => uploadMediaForm,
);

export const selectChangeAvatarForm = createSelector(
  [(state: RootState) => state.ui.modal.changeAvatarForm],
  (changeAvatarForm) => changeAvatarForm,
);
