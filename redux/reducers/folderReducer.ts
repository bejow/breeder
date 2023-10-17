import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { folderReducer, folderState, rootState } from '../../types';

const homeFolder: folderState = {name: "Root", id: "614573bd-5053-407b-9fb2-788563a1a451", parent:null}

const initialState: folderReducer = [
  homeFolder,
];


const folderSlice = createSlice({
  name: 'folders',
  initialState: initialState,
  reducers: {
    addFolder(state, action: PayloadAction<folderState>) {
      state.push(action.payload);
    },

    deleteFolder(state, action: PayloadAction<folderState>) {
      return state.filter((folder) => folder !== action.payload);
    },

    importOverride(state, action: PayloadAction<rootState>) {
      const newFolders: folderReducer = action.payload.folders
      return newFolders;
    },

    importAppendFolders(state, action: PayloadAction<rootState>) {
      const newFolders: folderReducer = action.payload.folders
      state.push(...newFolders);
    },
  },
});


export const { addFolder, importAppendFolders, importOverride, deleteFolder } = folderSlice.actions;
export default folderSlice.reducer;
export {homeFolder}