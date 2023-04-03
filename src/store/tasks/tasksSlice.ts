import { createSlice } from '@reduxjs/toolkit';
import { ITask } from './../../types/data';

import { tasksData } from '../../data';

type TasksState = {
  list: ITask[];
};

const initialState: TasksState = {
  list: [...tasksData],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list = [...state.list, { ...action.payload, id: state.list.length + 1 }];
    },
    toggleTaskStatus: (state, action) => {
      const editedTask = state.list.find((item) => item.id === action.payload);
      if (editedTask) {
        editedTask.completed = !editedTask.completed;
      }
    },
  },
});

export const { addTask, toggleTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
