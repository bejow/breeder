import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFolderById, getFolderIdsFromPath, getPathFromFolder } from '../../helper/folderHelper';
import { appStateReducer, folderReducer, folderState, rootState } from '../../types';
import { homeFolder } from './folderReducer';

const initialState: appStateReducer = {currentFolder: homeFolder}

const folderSlice = createSlice({
  name: 'appState',
  initialState: initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<folderState>) {
      return{...state, currentFolder: action.payload}
    },
  },
});

const selectCurrentFolder = (state: rootState) => state.appState.currentFolder
const selectFolders = (state: rootState) => state.folders

const getParentFolders = createSelector(selectCurrentFolder, selectFolders, (currentFolder: folderState, folders: folderReducer) => {
  // currentfolder structure: root/uuid/uuid --> split at "/" and enrich the ids with folder data
  if (currentFolder.parent === null){
    // return empty array if in root directory
    return []
  }

  let folderIds = getFolderIdsFromPath(getPathFromFolder(currentFolder))
  let parentFolders: folderReducer = []
  folderIds?.forEach(folderId => {
    // iterate over all folders and check for the one with the right id
    let folder = getFolderById(folders, folderId)
    if (folder){
      parentFolders.push(folder)
    }
  });
  return parentFolders
})


export {getParentFolders}
export const { setCurrentFolder } = folderSlice.actions;
export default folderSlice.reducer;
