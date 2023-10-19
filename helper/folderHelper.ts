import { folderReducer } from '../types';

const getPathToFolder = (folders: folderReducer, folderName: string | null) => {
  let pathToFolder: string | null = 'null';
  folders.forEach((folder) => {
    if (folder.name === folderName) {
      pathToFolder = folder.parent + '/' + folder.id;
      return;
    }
  });
  return pathToFolder;
};

const getPathToFolderById = (folders: folderReducer, folderId: string | null) => {
  let pathToFolder: string | null = 'null';
  folders.forEach((folder) => {
    if (folder.id === folderId) {
      pathToFolder = folder.parent + '/' + folder.id;
      return;
    }
  });
  return pathToFolder;
};


const getFolderIdsFromPath = (path: string | null) => {
  return path?.split('/');
};

const getCurrentFolderIdFromPath = (path: string | null) => {
  let pathFolderIds = getFolderIdsFromPath(path);
  if (pathFolderIds) {
    return pathFolderIds[pathFolderIds.length - 1];
  } else return null;
};

const getCurrentFolderNameFromPath = (folders: folderReducer, path: string|null) => {
  let folderId = getCurrentFolderIdFromPath(path)
  return folders.find(folder => folderId === folder.id)?.name 
}

export { getPathToFolder, getFolderIdsFromPath, getCurrentFolderIdFromPath, getPathToFolderById, getCurrentFolderNameFromPath };
