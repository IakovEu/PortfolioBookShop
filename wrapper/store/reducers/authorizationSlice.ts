import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	visibility: true,
	name: '',
	email: '',
	password: '',
	token: '',
};

export const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		setVisibility: (state, action) => {
			state.visibility = action.payload;
		},
		setUserData: (state, action) => {
			const [mail, pass, token] = action.payload;
			state.email = mail;
			state.password = pass;
			state.token = token;
		},
		editUserData: (state, action) => {
			const { name, pass, mail } = action.payload;
			state.email = mail;
			state.password = pass;
			state.name = name;
		},
	},
});

export const { setVisibility, setUserData, editUserData } =
	authorizationSlice.actions;
