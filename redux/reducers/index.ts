import { combineReducers } from "redux";
import  plantReducer from "./plantReducer";


const rootReducer = combineReducers({
  plants: plantReducer,
});

export { rootReducer };
