import { configureStore } from '@reduxjs/toolkit';
import { editProfileSlice } from './editProfileSlice';
import { bookStoreSlice } from './bookStoreSlice';
import { authorizationSlice } from './authorizationSlice';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

// Конфигурация персиста
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['bookStore', 'authorization', 'editProfile'], 
};

// Создаем персист редьюсер
const persistedReducer = persistCombineReducers(persistConfig, {
	bookStore: bookStoreSlice.reducer,
	authorization: authorizationSlice.reducer,
	editProfile: editProfileSlice.reducer,
});

// Создаем store с персистом
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Создаем persistor
export const persistor = persistStore(store);

// Создаем типизацию диспатча и селектора
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
