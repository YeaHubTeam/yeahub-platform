/* eslint-disable @conarti/feature-sliced/layers-slices */
import { AuthState } from '@/entities/auth';

import { CreateQuizPageState } from '@/pages/CreateQuizPage';
import { InterviewQuizPageState } from '@/pages/InterviewQuizPage';
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	auth: AuthState;
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	interviewQuizPage: InterviewQuizPageState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
