import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpenSidebar: false,
};

export const navSidebarSlice = createSlice({
	name: 'navSidebar',
	initialState,
	reducers: {
		toggleOpenSidebar: (state) => {
			state.isOpenSidebar = !state.isOpenSidebar;
		},
	},
});

export const { toggleOpenSidebar } = navSidebarSlice.actions;
