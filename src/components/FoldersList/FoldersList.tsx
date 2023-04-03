import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';
import { choiceCurrentFolder, deleteFolder } from '../../store/folders/foldersSlice';
import './FoldersList.scss';

import FoldersItem from '../FoldersItem/FoldersItem';

const FoldersList: React.FC = () => {
  const dispatch = useAppDispatch();

  const foldersData = useAppSelector((state) => state.folders.list);
  const currentFolder = useAppSelector((state) => state.folders.currentFolder);

  const choiceFolderCallback = (id: number): void => {
    dispatch(choiceCurrentFolder(id));
  };

  const deleteFolderCallback = (id: number): void => {
    dispatch(deleteFolder(id));
  };

  return (
    <div className="folders">
      {foldersData.map((item) => (
        <FoldersItem
          key={item.id}
          id={item.id}
          name={item.name}
          color={item.color}
          isChosen={currentFolder.id === item.id}
          choiceFolder={choiceFolderCallback}
          deleteFolder={deleteFolderCallback}
        />
      ))}
    </div>
  );
};

export default FoldersList;
