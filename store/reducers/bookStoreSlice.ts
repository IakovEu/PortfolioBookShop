import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@/types/response';

interface FavoritesItem {
	amount: number;
	data: Item;
}

interface BookStoreState {
	activeCat: number;
	favorites: Record<string, FavoritesItem>;
}

export const initialState: BookStoreState = {
	activeCat: 0,
	favorites: {},
};

export const bookStoreSlice = createSlice({
	name: 'bookStore',
	initialState,
	reducers: {
		changeCategory: (state, action) => {
			state.activeCat = action.payload;
		},
		addRemoveFav: (state, action: PayloadAction<Item>) => {
			const title = action.payload.volumeInfo.title;

			if (title in state.favorites) {
				delete state.favorites[title];
			} else {
				state.favorites[title] = {
					amount: 1,
					data: action.payload,
				};
			}
		},
		decrease: (state, action: PayloadAction<FavoritesItem>) => {
			const title = action.payload.data.volumeInfo.title;
			const amount = action.payload.amount;

			if (amount === 1) {
				delete state.favorites[title];
			} else {
				state.favorites[title].amount -= 1;
			}
		},
		increase: (state, action: PayloadAction<FavoritesItem>) => {
			const title = action.payload.data.volumeInfo.title;
			state.favorites[title].amount += 1;
		},
	},
});

export const { changeCategory, addRemoveFav, increase, decrease } =
	bookStoreSlice.actions;
