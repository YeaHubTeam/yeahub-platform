import { combineReducers } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';

import { navigationsSidebarSlice } from '@/widgets/NavigationSidebar';

export const rootReducer = combineReducers({
	[navigationsSidebarSlice.name]: navigationsSidebarSlice.reducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
