import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../hook';
import { addFolder } from '../../store/folders/foldersSlice';
import './Menu.scss';

import FoldersList from '../FoldersList/FoldersList';
import Icon from '../Icon/Icon';

import { colors } from '../../data';

import addIcon from '../../assets/images/addItemIcon.svg';
import allIcon from '../../assets/images/showAllIcon.svg';
import closeIcon from '../../assets/images/closeModal.svg';

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState(false);
  const [paletteColor, setPaletteColor] = useState('#C9D1D3');
  const [folderInputValue, setFolderInputValue] = useState('');

  const onFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFolderInputValue(e.target.value);
  };

  const onColorChange = (color: string): void => {
    setPaletteColor(color);
  };

  const onAddFolder = (): void => {
    const folderObj = {
      color: paletteColor,
      name: folderInputValue,
    };
    dispatch(addFolder(folderObj));
  };

  return (
    <menu className="menu">
      <FoldersList />
      <button className="menu-add" onClick={() => setModalActive((prevState) => !prevState)}>
        <Icon src={addIcon} alt="add" className="menu-add-icon" />
        <p className="menu-add-text">Добавить папку</p>
      </button>
      <div className={classNames('menu-modal', { active: modalActive })}>
        <button className="menu-modal-close" type="button" onClick={() => setModalActive(false)}>
          <Icon src={closeIcon} alt="close" />
        </button>
        <input
          type="text"
          className="menu-modal-input"
          placeholder="Название папки"
          onChange={(e) => onFolderInputChange(e)}
        />
        <div className="menu-modal-palette">
          {colors.map((item) => (
            <button
              className={classNames('menu-modal-color', { current: item.color === paletteColor })}
              type="button"
              key={item.id}
              style={{ background: item.color }}
              onClick={() => onColorChange(item.color)}
            />
          ))}
        </div>
        <button className="menu-modal-button" onClick={() => onAddFolder()}>
          Добавить
        </button>
      </div>
    </menu>
  );
};

export default Menu;
