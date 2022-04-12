import { combineReducers } from "redux";
import  plantReducer from "./plantReducer";
import  seedReducer from "./seedReducer";


const rootReducer = combineReducers({
  plants: plantReducer,
  seeds: seedReducer
});

export { rootReducer };
