import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { State } from '@/shared/config/store/State';

import { activeQuizSlice } from '@/entities/quiz';

import { createQuizPageReducer } from '@/pages/CreateQuizPage';
import { interviewHistoryPageReducer } from '@/pages/InterviewHistoryPage';
import { questionsPageReducer } from '@/pages/QuestionsPage';

import { router } from '../../router';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
			questionsPage: questionsPageReducer,
			createQuizPage: createQuizPageReducer,
			activeQuiz: activeQuizSlice.reducer,
			[baseApi.reducerPath]: baseApi.reducer,
			interviewHistoryPage: interviewHistoryPageReducer,
		},
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						navigate: router.navigate,
					},
				},
			}).concat(baseApi.middleware),
	});
};

const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
