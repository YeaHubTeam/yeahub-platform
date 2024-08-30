/* eslint-disable @conarti/feature-sliced/layers-slices */
import { ActiveQuizState } from '@/entities/quiz';

import { CreateQuizPageState } from '@/pages/CreateQuizPage';
import { InterviewHistoryPageState } from '@/pages/InterviewHistoryPage';
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	activeQuiz: ActiveQuizState;
	interviewHistoryPage: InterviewHistoryPageState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
