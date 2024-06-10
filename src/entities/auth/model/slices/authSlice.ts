import { createSlice } from '@reduxjs/toolkit';

interface State {}

const initialState: State = {};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// setUsersList: (state, action: PayloadAction<User[]>) => {
		// 	state.usersList = action.payload;
		// },
	},
});

// export const { setUsersList } = usersSlice.actions;
