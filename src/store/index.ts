import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or 'redux-persist/lib/storage/session' for session storage
import rootReducer from './reducers'; // Create your root reducer
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export { store, persistor };
