import React from 'react';
import { useSelector } from 'react-redux';
import { selectMetaInfo } from '../../redux/modules/drawer';

export const MetaInfo: React.VFC = () => {
  const metaInfoIsOpened = useSelector(selectMetaInfo);

  return <>{metaInfoIsOpened && <aside className="bg-blue-100">Meta</aside>}</>;
};
