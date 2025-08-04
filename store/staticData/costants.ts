import { ToastOptions } from 'react-toastify';
import type { InnerStore } from '@/types/innerStore';

// Настройка уведомлений от реакт тостифай
export const toastSettings: ToastOptions = {
	position: 'bottom-right',
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
	theme: 'dark',
};

// Ключи - варианты каталога книг / сам объект - хранилище текущей сессии
// (можно было и через редакс стор но не хочу сохранять слишком много туда)
export const innerStore: InnerStore = {
	Architecture: [],
	'Art & Fashion': [],
	Biography: [],
	Business: [],
	'Crafts & Hobbies': [],
	Drama: [],
	Fiction: [],
	'Food & Drink': [],
	'Health & Fitness': [],
	'History & Politics': [],
	Humor: [],
	Poetry: [],
	Psychology: [],
	Science: [],
	Technology: [],
	'Travel & Maps': [],
};

// Апи ключи
export const localKey = process.env.NEXT_PUBLIC_API_KEY;
export const secretKey = process.env.API_SECRET_KEY;
