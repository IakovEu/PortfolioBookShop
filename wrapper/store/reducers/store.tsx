import { configureStore } from '@reduxjs/toolkit';
import { activeCategorySlice } from './activeCategorySlice';
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
	whitelist: ['activeCategory'], // редьюсеры, которые нужно сохранять
};

// Создаем персист редьюсер
const persistedReducer = persistCombineReducers(persistConfig, {
	activeCategory: activeCategorySlice.reducer,
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
