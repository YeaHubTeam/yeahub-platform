import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { sentryMiddleware } from '@/shared/config/sentry/middleware';
import { sentryApiErrorMiddleware } from '@/shared/config/sentry/sentryApiErrorMiddleware';
import { State } from '@/shared/config/store/State';

import { refreshMiddleware } from '@/entities/auth';
import { profileReducer } from '@/entities/profile';
import { activeQuizSlice } from '@/entities/quiz';
import { activeSubscriptionSlice } from '@/entities/subscription';

import { collectionsPageReducer } from '@/pages/admin/CollectionsPage';
import { companiesTablePageReducer } from '@/pages/admin/CompaniesTablePage';
import { questionsTablePageReducer } from '@/pages/admin/QuestionsTablePage';
import { resourcesAllTabReducer, resourcesRequestsTabReducer } from '@/pages/admin/ResourcesPage';
import { skillsPageReducer } from '@/pages/admin/SkillsPage';
import { specializationsPageReducer } from '@/pages/admin/SpecializationsPage';
import { usersPageReducer } from '@/pages/admin/UserTablePage';
import { createQuizPageReducer } from '@/pages/interview/CreateQuizPage';
import { interviewHistoryPageReducer } from '@/pages/interview/InterviewHistoryPage';
import { questionsPageReducer } from '@/pages/interview/QuestionsPage';
import { createPublicQuizPageReducer } from '@/pages/landing/CreatePublicQuizPage';

import { router } from '../../router';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
			questionsPage: questionsPageReducer,
			skillsPage: skillsPageReducer,
			createQuizPage: createQuizPageReducer,
			createPublicQuizPage: createPublicQuizPageReducer,
			activeQuiz: activeQuizSlice.reducer,
			activeSubscription: activeSubscriptionSlice.reducer,
			[baseApi.reducerPath]: baseApi.reducer,
			resourcesAllTab: resourcesAllTabReducer,
			interviewHistoryPage: interviewHistoryPageReducer,
			questionsTablePage: questionsTablePageReducer,
			companiesTablePage: companiesTablePageReducer,
			specializationsPage: specializationsPageReducer,
			usersPage: usersPageReducer,
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
