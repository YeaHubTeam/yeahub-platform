// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { User } from '../types/usersTypes';

interface State {
	usersList: User[];
}

const initialState: State = {
	usersList: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		// setUsersList: (state, action: PayloadAction<User[]>) => {
		// 	state.usersList = action.payload;
		// },
	},
});

// export const { setUsersList } = usersSlice.actions;
