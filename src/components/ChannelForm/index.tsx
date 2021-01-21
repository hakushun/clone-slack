import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChannelForm,
  toggleChannelForm,
} from '../../redux/modules/modal';
import { Overlay } from '../Overlay';

export const ChannelForm: React.VFC = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(selectChannelForm);

  const closeForm = () => {
    dispatch(toggleChannelForm(false));
  };

  return (
    <>
      {isOpened && (
        <Overlay>
          <div>
            form
            <button type="button" onClick={closeForm}>
              cancel
            </button>
          </div>
        </Overlay>
      )}
    </>
  );
};
