import { combineReducers } from '@reduxjs/toolkit';

import { baseApi, createReduxStore, State } from '@/shared/config';

import { refreshMiddleware } from '@/entities/auth';
import { profileReducer } from '@/entities/profile';
import { activeQuizSlice } from '@/entities/quiz';
import { activeSubscriptionSlice } from '@/entities/subscription';

import { collectionsPageReducer } from '@/pages/admin/collection/collections';
import { companiesTablePageReducer } from '@/pages/admin/company/companies';
import { questionsTablePageReducer } from '@/pages/admin/question/questions';
import {
	resourcesAllTabReducer,
	resourcesRequestsTabReducer,
} from '@/pages/admin/resource/resources';
import { skillsPageReducer } from '@/pages/admin/skill/skills';
import { specializationsPageReducer } from '@/pages/admin/specialization/specializations';
import { tasksTablePageReducer } from '@/pages/admin/task/tasks';
import { topicsPageReducer } from '@/pages/admin/topic/topics';
import { interviewHistoryPageReducer } from '@/pages/interview/interviewHistory';

import { router } from '../router';

export const reducers = {
	skillsPage: skillsPageReducer,
	activeQuiz: activeQuizSlice.reducer,
	activeSubscription: activeSubscriptionSlice.reducer,
	[baseApi.reducerPath]: baseApi.reducer,
	resourcesAllTab: resourcesAllTabReducer,
	interviewHistoryPage: interviewHistoryPageReducer,
	questionsTablePage: questionsTablePageReducer,
	companiesTablePage: companiesTablePageReducer,
	specializationsPage: specializationsPageReducer,
	profile: profileReducer,
	collectionsPage: collectionsPageReducer,
	resourcesRequestsTab: resourcesRequestsTabReducer,
	topicsPage: topicsPageReducer,
	tasksTablePage: tasksTablePageReducer,
};

export const getStore = (initialState?: State) =>
	createReduxStore({
		reducers: combineReducers(reducers),
		extraArgument: {
			navigate: router.navigate,
		},
		middleware: refreshMiddleware.middleware,
		initialState,
	});

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
