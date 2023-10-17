import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appStateReducer, folderReducer, rootState } from '../../types';

const initialState: appStateReducer = {currentFolder: null}

const folderSlice = createSlice({
  name: 'appState',
  initialState: initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<string|null>) {
      return{...state, currentFolder: action.payload}
    },
  },
});

const selectCurrentFolder = (state: rootState) => state.appState.currentFolder
const selectFolders = (state: rootState) => state.folders

const getParentFolders = createSelector(selectCurrentFolder, selectFolders, (currentFolder: string|null, folders: folderReducer) => {
  // currentfolder structure: root/uuid/uuid --> split at "/" and enrich the ids with folder data
  let folderIds = currentFolder?.split("/")
  let parentFolders: folderReducer = []
  folderIds?.forEach(folderId => {
    // iterate over all folders and check for the one with the right id
    folders.forEach((folder) => {
      if (folder.id === folderId){
        parentFolders.push(folder)
      }
    })
  });
  return parentFolders
})

const getPathToFolder = createSelector(selectFolders, (folders:folderReducer, folderName: string) => folderName, (folders, folderName) => {
  let pathToFolder:string|null = null;
  folders.forEach(folder => {
    if (folder.name === folderName){
      pathToFolder = folder.parent  + "/" + folder.id
      return
    }
  });
  return pathToFolder
})

export {getParentFolders, getPathToFolder}
export const { setCurrentFolder } = folderSlice.actions;
export default folderSlice.reducer;
