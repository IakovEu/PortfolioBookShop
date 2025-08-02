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
		setIsAuthorizationOpen: (state) => {
			state.isAuthorizationOpen = !state.isAuthorizationOpen;
		},
	},
});

export const { setIsEditOpen, setIsAuthorizationOpen } =
	editProfileSlice.actions;
