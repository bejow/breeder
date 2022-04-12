import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  


export const store = createStore(persistReducer(persistConfig,rootReducer), applyMiddleware(thunk));
export const persistor = persistStore(store);