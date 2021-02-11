import { useDispatch, useSelector } from 'react-redux';
import {
  selectAboutIsOpened,
  selectMembersIsOpened,
  Keys,
  toggleAccordion,
} from '../redux/modules/accordion';
import { selectMetaInfo, toggleMetaInfo } from '../redux/modules/drawer';

type UseToggleUIType = () => {
  metaInfoIsOpened: boolean;
  aboutIsOpened: boolean;
  membersIsOpened: boolean;
  handleToggleDrawer: () => void;
  handleToggleAccordion: (_key: Keys) => void;
};
export const useToggleUI: UseToggleUIType = () => {
  const dispatch = useDispatch();
  const metaInfoIsOpened = useSelector(selectMetaInfo);
  const aboutIsOpened = useSelector(selectAboutIsOpened);
  const membersIsOpened = useSelector(selectMembersIsOpened);

  const handleToggleDrawer = () => {
    dispatch(toggleMetaInfo(!metaInfoIsOpened));
  };

  const handleToggleAccordion = (key: Keys) => {
    dispatch(toggleAccordion(key));
  };

  return {
    metaInfoIsOpened,
    aboutIsOpened,
    membersIsOpened,
    handleToggleDrawer,
    handleToggleAccordion,
  };
};
