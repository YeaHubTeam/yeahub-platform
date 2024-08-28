/* eslint-disable @conarti/feature-sliced/layers-slices */
import { AuthState } from '@/entities/auth';

import { CreateQuizPageState } from '@/pages/CreateQuizPage';
import { ProfilePageState } from '@/pages/ProfilePage';
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	auth: AuthState;
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	profilePage: ProfilePageState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
