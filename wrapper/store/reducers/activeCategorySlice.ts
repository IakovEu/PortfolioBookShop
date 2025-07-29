import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

export const activeCategorySlice = createSlice({
	name: 'activeCategory',
	initialState,
	reducers: {
		changeCategory: (state, action) => action.payload,
	},
});

export const { changeCategory } = activeCategorySlice.actions;
