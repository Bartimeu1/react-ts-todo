import React from 'react';
import classNames from 'classnames';
import './FoldersItem.scss';

import deleteIcon from '../../assets/images/deleteItemIcon.svg';

import Icon from '../Icon/Icon';

type FolderItemProps = {
  id: number;
  name: string;
  color: string;
  isChosen: boolean;
  choiceFolder: (id: number) => void;
  deleteFolder: (id: number) => void;
}

const FoldersItem: React.FC<FolderItemProps> = ({
  id,
  name,
  color,
  isChosen,
  choiceFolder,
  deleteFolder,
}) => {
  return (
    <div className="folders-item">
      <button
        type="button"
        className={classNames('folders-button', { chosen: isChosen })}
        onClick={() => choiceFolder?.(id)}>
        <div className="folders-button-circle" style={{ background: color }} />
        <p className="folders-button-text">{name}</p>
      </button>
      {isChosen && (
        <button type="button" className="folders-button--delete" onClick={() => deleteFolder?.(id)}>
          <Icon src={deleteIcon} alt="deleteItem" />
        </button>
      )}
    </div>
  );
};

export default FoldersItem;
