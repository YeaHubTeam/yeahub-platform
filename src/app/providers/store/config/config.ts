import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { State } from '@/shared/config/store/State';

import { refreshMiddleware } from '@/entities/auth';
import { profileReducer } from '@/entities/profile';
import { activeQuizSlice } from '@/entities/quiz';

import { collectionsPageReducer } from '@/pages/admin/CollectionsPage';
import { questionsTablePageReducer } from '@/pages/admin/QuestionsTablePage';
import { skillsPageReducer } from '@/pages/admin/SkillsPage';
import { specializationsPageReducer } from '@/pages/admin/SpecializationsPage';
import { usersPageReducer } from '@/pages/admin/UserTablePage';
import { createQuizPageReducer } from '@/pages/interview/CreateQuizPage';
import { interviewHistoryPageReducer } from '@/pages/interview/InterviewHistoryPage';
import { questionsPageReducer } from '@/pages/interview/QuestionsPage';

import { router } from '../../router';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
			questionsPage: questionsPageReducer,
			skillsPage: skillsPageReducer,
			createQuizPage: createQuizPageReducer,
			activeQuiz: activeQuizSlice.reducer,
			[baseApi.reducerPath]: baseApi.reducer,
			interviewHistoryPage: interviewHistoryPageReducer,
			questionsTablePage: questionsTablePageReducer,
			specializationsPage: specializationsPageReducer,
			usersPage: usersPageReducer,
			profile: profileReducer,
			collectionsPage: collectionsPageReducer,
		},
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						navigate: router.navigate,
					},
				},
			}).concat(baseApi.middleware, refreshMiddleware.middleware),
	});
};

const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
