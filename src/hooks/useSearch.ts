import { useDispatch } from 'react-redux';
import { searchMessage } from '../redux/modules/search';

type UseSearchType = () => {
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useSearch: UseSearchType = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchMessage({ search: e.target.value }));
  };
  return { handleChange };
};
