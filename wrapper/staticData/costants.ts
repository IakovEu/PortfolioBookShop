import { ToastOptions } from 'react-toastify';
// Варианты каталога книг
export const categories = [
	'Architecture',
	'Art & Fashion',
	'Biography',
	'Business',
	'Crafts & Hobbies',
	'Drama',
	'Fiction',
	'Food & Drink',
	'Health & Fitness',
	'History & Politics',
	'Humor',
	'Poetry',
	'Psychology',
	'Science',
	'Technology',
	'Travel & Maps',
];

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
