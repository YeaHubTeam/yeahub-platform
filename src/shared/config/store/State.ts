/* eslint-disable @conarti/feature-sliced/layers-slices */
import { ProfileState } from '@/entities/profile';
import { ActiveQuizState } from '@/entities/quiz';

import { CollectionsPageState } from '@/pages/admin/CollectionsPage';
import { ICompaniesTablePageState } from '@/pages/admin/CompaniesTablePage';
import { QuestionsTablePageState } from '@/pages/admin/QuestionsTablePage';
import { SkillsPageState } from '@/pages/admin/SkillsPage';
import { SpecializationsPageState } from '@/pages/admin/SpecializationsPage';
import { UsersPageState } from '@/pages/admin/UserTablePage';
import { CreateQuizPageState } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryState } from '@/pages/interview/InterviewHistoryPage';
import { QuestionsPageState } from '@/pages/interview/QuestionsPage';
import { CreatePublicQuizPageState } from '@/pages/landing/CreatePublicQuizPage';

import { baseApi } from '../api/baseApi';

export interface State {
	questionsPage: QuestionsPageState;
	createQuizPage: CreateQuizPageState;
	createPublicQuizPage: CreatePublicQuizPageState;
	activeQuiz: ActiveQuizState;
	interviewHistoryPage: InterviewHistoryState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
	questionsTablePage: QuestionsTablePageState;
	companiesTablePage: ICompaniesTablePageState;
	specializationsPage: SpecializationsPageState;
	skillsPage: SkillsPageState;
	usersPage: UsersPageState;
	profile: ProfileState;
	collectionsPage: CollectionsPageState;
}
