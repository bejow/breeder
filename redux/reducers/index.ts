import { combineReducers } from "redux";
import  plantReducer from "./plantReducer";
import  seedReducer from "./seedReducer";
import folderReducer from "./folderReducer";
import appStateReducer from "./appStateReducer";


const rootReducer = combineReducers({
  plants: plantReducer,
  seeds: seedReducer,
  folders: folderReducer,
  appState: appStateReducer
});





export { rootReducer };
