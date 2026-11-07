import { combineReducers } from '@reduxjs/toolkit';

import { baseApi, createReduxStore, State } from '@/shared/config';

import { refreshMiddleware } from '@/entities/auth';
import { featureFlagReducer } from '@/entities/featureFlag';
import { profileReducer } from '@/entities/profile';
import { activeQuizSlice } from '@/entities/quiz';
import { activeSubscriptionSlice } from '@/entities/subscription';

import { collectionsPageReducer } from '@/pages/admin/collection/collections';
import { questionsTablePageReducer } from '@/pages/admin/question/questions';
import { skillsPageReducer } from '@/pages/admin/skill/skills';
import { specializationsPageReducer } from '@/pages/admin/specialization/specializations';
import { tasksTablePageReducer } from '@/pages/admin/task/tasks';
import { interviewHistoryPageReducer } from '@/pages/interview/interviewHistory';

import { router } from '../router';

export const reducers = {
	skillsPage: skillsPageReducer,
	activeQuiz: activeQuizSlice.reducer,
	activeSubscription: activeSubscriptionSlice.reducer,
	[baseApi.reducerPath]: baseApi.reducer,
	interviewHistoryPage: interviewHistoryPageReducer,
	questionsTablePage: questionsTablePageReducer,
	specializationsPage: specializationsPageReducer,
	profile: profileReducer,
	collectionsPage: collectionsPageReducer,
	tasksTablePage: tasksTablePageReducer,
	featureFlag: featureFlagReducer,
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
