/* eslint-disable @conarti/feature-sliced/layers-slices */
import { ActiveQuizState } from '@/entities/quiz';

import { QuestionsTablePageState } from '@/pages/admin/QuestionsTablePage';
import { SkillsPageState } from '@/pages/admin/SkillsPage';
import { CreateQuizPageState } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryState } from '@/pages/interview/InterviewHistoryPage';
import { QuestionsPageState } from '@/pages/interview/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	activeQuiz: ActiveQuizState;
	interviewHistoryPage: InterviewHistoryState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
	questionsTablePage: QuestionsTablePageState;
	skillsPage: SkillsPageState;
}
