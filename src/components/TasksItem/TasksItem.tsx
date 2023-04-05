import React, { FC } from 'react';
import './TaskItem.scss';

import completedIcon from '../../assets/images/trueIcon.svg';
import unfulfilledIcon from '../../assets/images/unfulfilledIcon.svg';

import Icon from '../Icon/Icon';

type TaskItemProps = {
  id: number;
  text: string;
  completed: boolean;
  changeStatus: (id: number) => void;
}

const TasksItem: FC<TaskItemProps> = ({ id, text, completed, changeStatus }) => {
  return (
    <div className="task">
      <button type="button" className="task-button" onClick={() => changeStatus(id)}>
        <Icon
          src={completed ? completedIcon : unfulfilledIcon}
          alt="completed"
          className="task-button-image"
        />
      </button>
      <p className="task-text">{text}</p>
    </div>
  );
};

export default TasksItem;
