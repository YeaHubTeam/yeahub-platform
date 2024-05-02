import { combineReducers } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';

import { navSidebarSlice } from '@/widgets/NavSidebar';

export const rootReducer = combineReducers({
	[navSidebarSlice.name]: navSidebarSlice.reducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
