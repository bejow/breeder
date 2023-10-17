import { folderReducer } from "../types";

const getPathToFolder = (folders: folderReducer, folderName: string | null) => {
    let pathToFolder:string|null = "null";
    folders.forEach(folder => {
      if (folder.name === folderName){
        pathToFolder = folder.parent + "/" + folder.id
        return
      }
    });
    return pathToFolder
}

export {getPathToFolder}