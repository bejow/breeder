import { applyMiddleware, createStore } from 'redux';

import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createTransform from 'redux-persist/es/createTransform';
import traverse from '@babel/traverse';

const replacer = (key: string, value: Date) => (value instanceof Date ? value.toISOString() : value);

const reviver = (key: string, value: string) =>
  typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;

export const encode = (toDehydrate: any) => JSON.stringify(toDehydrate, replacer);

export const decode = (toRehydrate: string) => JSON.parse(toRehydrate, reviver);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [createTransform(encode, decode)],
};

export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(thunk));
export const persistor = persistStore(store);
