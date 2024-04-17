import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpenSidebar: false,
};

export const navigationsSidebarSlice = createSlice({
	name: 'navigationSidebar',
	initialState,
	reducers: {
		toggleOpenSidebar: (state) => {
			state.isOpenSidebar = !state.isOpenSidebar;
		},
	},
});

export const { toggleOpenSidebar } = navigationsSidebarSlice.actions;
