import { useDispatch, useSelector } from 'react-redux';
import {
  selectAboutIsOpened,
  selectMembersIsOpened,
  Keys,
  toggleAccordion,
} from '../redux/modules/accordion';
import { selectMetaInfo, toggleMetaInfo } from '../redux/modules/drawer';
import { selectAccountMenu, toggleAccountMenu } from '../redux/modules/dropdown';

type UseToggleUIType = () => {
  metaInfoIsOpened: boolean;
  aboutIsOpened: boolean;
  membersIsOpened: boolean;
  accountMenuIsOpened: boolean;
  handleToggleDrawer: () => void;
  handleToggleAccordion: (_key: Keys) => void;
  handleToggleDropdown: () => void;
};
export const useToggleUI: UseToggleUIType = () => {
  const dispatch = useDispatch();
  const metaInfoIsOpened = useSelector(selectMetaInfo);
  const aboutIsOpened = useSelector(selectAboutIsOpened);
  const membersIsOpened = useSelector(selectMembersIsOpened);
  const accountMenuIsOpened = useSelector(selectAccountMenu);

  const handleToggleDrawer = () => {
    dispatch(toggleMetaInfo(!metaInfoIsOpened));
  };

  const handleToggleAccordion = (key: Keys) => {
    dispatch(toggleAccordion(key));
  };

  const handleToggleDropdown = () => {
    dispatch(toggleAccountMenu(!accountMenuIsOpened));
  };

  return {
    metaInfoIsOpened,
    aboutIsOpened,
    membersIsOpened,
    accountMenuIsOpened,
    handleToggleDrawer,
    handleToggleAccordion,
    handleToggleDropdown,
  };
};
