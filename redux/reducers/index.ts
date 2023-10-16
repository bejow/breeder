import { combineReducers } from "redux";
import  plantReducer from "./plantReducer";
import  seedReducer from "./seedReducer";
import folderReducer from "./folderReducer";


const rootReducer = combineReducers({
  plants: plantReducer,
  seeds: seedReducer,
  folders: folderReducer
});





export { rootReducer };
