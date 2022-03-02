import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH, PAUSE,
    PERSIST, persistReducer, persistStore, PURGE,
    REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import homeReducer from '../containers/home/store/slice';

const rootReducer = combineReducers({
    app: homeReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const appReducer = (state, action) => {
    return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
