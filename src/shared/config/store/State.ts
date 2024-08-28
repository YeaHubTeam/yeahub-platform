/* eslint-disable @conarti/feature-sliced/layers-slices */
import { ActiveQuizState } from '@/entities/quiz';

import { CreateQuizPageState } from '@/pages/CreateQuizPage';
import { ProfilePageState } from '@/pages/ProfilePage';
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	profilePage: ProfilePageState;
	activeQuiz: ActiveQuizState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
