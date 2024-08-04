/* eslint-disable @conarti/feature-sliced/public-api */
/* eslint-disable @conarti/feature-sliced/layers-slices */
import { AuthState } from '@/entities/auth';

import { CreateQuizPageState } from '@/pages/CreateQuizPage';
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	auth: AuthState;
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
