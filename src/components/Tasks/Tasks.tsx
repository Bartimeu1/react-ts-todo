import React, { FC, useState, useEffect, useRef } from 'react';
import './Tasks.scss';
import { useAppSelector, useAppDispatch } from '../../hook';
import { addTask, toggleTaskStatus } from '../../store/tasks/tasksSlice';
import { editFolderName } from '../../store/folders/foldersSlice';

import addIcon from '../../assets/images/addItemGreyIcon.svg';
import edtIcon from '../../assets/images/editNameIcon.svg';
import trueIcon from '../../assets/images/trueIcon.svg';

import Icon from '../Icon/Icon';
import TasksItem from '../TasksItem/TasksItem';

interface ITasks {
  empty: boolean;
}

const Tasks: FC<ITasks> = ({ empty }) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.list);
  const currentFolder = useAppSelector((state) => state.folders.currentFolder);

  // Edit Folder Name
  const [inputNameValue, setInputNameValue] = useState(currentFolder.name);
  const [editNameActive, setEditNameActive] = useState(false);

  const onEditInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputNameValue(e.target.value);
  };

  const onEditFolderName = (): void => {
    const editObject = {
      folderId: currentFolder.id,
      newName: inputNameValue,
    };
    dispatch(editFolderName(editObject));

    setEditNameActive(false);
  };

  useEffect(() => {
    setInputNameValue(currentFolder.name);
    setEditNameActive(false);
  }, [currentFolder]);

  // Set Focus To Folder Name Input
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editNameActive]);

  // Add New Task
  const [modalActive, setModalActive] = useState(false);
  const [inputTaskValue, setTaskInputValue] = useState('');

  const onTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskInputValue(e.target.value);
  };

  const onAddTask = (): void => {
    const taskObj = {
      folderId: currentFolder.id,
      text: inputTaskValue,
      completed: false,
    };
    dispatch(addTask(taskObj));

    setTaskInputValue('');
  };

  // Change Task Status
  const changeStatusCallback = (id: number): void => {
    dispatch(toggleTaskStatus(id));
  };

  return empty ? (
    <p className="tasks--empty">Задачи отсутствуют</p>
  ) : (
    <div className="tasks">
      <div className="tasks-folder">
        {!editNameActive ? (
          <>
            <h1 className="tasks-folder-title" style={{ color: currentFolder.color }}>
              {currentFolder.name}
            </h1>
            <button
              type="button"
              className="tasks-folder-edit"
              onClick={() => setEditNameActive(true)}>
              <Icon src={edtIcon} alt="edit" className="tasks-folder-image" />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="tasks-folder-input"
              value={inputNameValue}
              style={{ color: currentFolder.color }}
              ref={editInputRef}
              onChange={(e) => onEditInputChange(e)}
            />
            <button type="button" className="tasks-folder-true" onClick={() => onEditFolderName()}>
              <Icon src={trueIcon} alt="true" />
            </button>
          </>
        )}
      </div>
      <div className="tasks-list">
        {tasks.map(
          (item) =>
            currentFolder.id === item.folderId && (
              <TasksItem
                key={item.id}
                id={item.id}
                text={item.text}
                completed={item.completed}
                changeStatus={changeStatusCallback}
              />
            ),
        )}
      </div>
      {!modalActive ? (
        <button className="tasks-add" type="button" onClick={() => setModalActive(true)}>
          <Icon src={addIcon} alt="add" className="tasks-add-image" />
          Новая задача
        </button>
      ) : (
        <div className="tasks-modal">
          <input
            type="text"
            className="tasks-modal-input"
            value={inputTaskValue}
            placeholder="Текст задачи"
            onChange={(e) => onTaskInputChange(e)}
          />
          <div className="tasks-modal-controls">
            <button type="button" className="tasks-modal-add" onClick={() => onAddTask()}>
              Добавить задачу
            </button>
            <button
              type="button"
              className="tasks-modal-close"
              onClick={() => setModalActive(false)}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
