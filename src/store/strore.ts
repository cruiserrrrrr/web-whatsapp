import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from '../store/reducers/UserSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    userReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducers
    })
};
// const store = configureStore({
//     reducer: persistedReducers
// })

// export const persister = persistStore(setupStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];