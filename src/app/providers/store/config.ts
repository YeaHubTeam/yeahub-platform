import { configureStore } from '@reduxjs/toolkit';

import { baseApi, sentryMiddleware, sentryApiErrorMiddleware, State } from '@/shared/config';

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
import { interviewHistoryPageReducer } from '@/pages/interview/interviewHistory';

import { router } from '../router';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
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
		},
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						navigate: router.navigate,
					},
				},
			}).concat(
				baseApi.middleware,
				refreshMiddleware.middleware,
				sentryMiddleware,
				sentryApiErrorMiddleware,
			),
	});
};

const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
