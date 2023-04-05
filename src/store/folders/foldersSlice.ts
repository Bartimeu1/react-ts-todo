import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IFolder } from '../../types/data';

import { foldersData } from '../../data';

type FoldersState = {
  list: IFolder[];
  currentFolder: IFolder;
};

const initialState: FoldersState = {
  list: [...foldersData],
  currentFolder: foldersData[0],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    choiceCurrentFolder: (state, action) => {
      state.currentFolder = state.list.find((item) => item.id === action.payload) || foldersData[0];
    },
    addFolder: (state, action) => {
      const newFolder = { ...action.payload, id: uuidv4() };
      state.list.push({ ...newFolder })
      state.currentFolder = newFolder;
    },
    deleteFolder: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.currentFolder = foldersData[0];
    },
    editFolderName: (state, action) => {
      const editedFolder = state.list.find((item) => item.id === action.payload.folderId);
      if (editedFolder) {
        editedFolder.name = action.payload.newName;
        state.currentFolder = editedFolder;
      }
    },
  },
});

export const { choiceCurrentFolder, addFolder, editFolderName, deleteFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;
