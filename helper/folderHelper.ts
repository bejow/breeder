import { folderReducer, folderState, plantsReducer } from '../types';

const getPathToFolderName = (folders: folderReducer, folderName: string | null) => {
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

const getCurrentFolderNameFromPath = (folders: folderReducer, path: string | null) => {
  let folderId = getCurrentFolderIdFromPath(path)
  return folders.find(folder => folderId === folder.id)?.name || "undefined name"
}

const getPathFromFolder = (folder: folderState) => {
  return folder.parent + "/" + folder.id
}

const isFolderEmpty = (folders: folderReducer, plants: plantsReducer, folderToDelete: folderState) => {
  const folderPath = getPathFromFolder(folderToDelete)
  const folderContainsFolder = folders.some((folder) => (folder.parent === folderPath))
  const folderContainsPlants = plants.some((plant) => (plant.folder === folderPath))
  if (folderContainsFolder || folderContainsPlants) {
    return false
  }
  return true
}

const getFolderById = (folders: folderReducer, folderId: string) => {
 return folders.find((folder) => {
    return folder.id === folderId
  })
}

export { getPathToFolderName, getFolderIdsFromPath, getCurrentFolderIdFromPath, getPathToFolderById, getCurrentFolderNameFromPath, isFolderEmpty, getPathFromFolder, getFolderById };
