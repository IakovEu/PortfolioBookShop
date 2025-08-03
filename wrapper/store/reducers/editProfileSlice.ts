import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditOpen: false,
	isAuthorizationOpen: false,
};

export const editProfileSlice = createSlice({
	name: 'editProfile',
	initialState,
	reducers: {
		setIsEditOpen: (state) => {
			state.isEditOpen = !state.isEditOpen;
		},
	},
});

export const { setIsEditOpen } = editProfileSlice.actions;
