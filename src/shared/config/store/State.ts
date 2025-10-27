/* eslint-disable @conarti/feature-sliced/layers-slices */
import { ProfileState } from '@/entities/profile';
import { ActiveQuizState } from '@/entities/quiz';
import { ActiveSubscriptionState } from '@/entities/subscription';

import { CollectionsPageState } from '@/pages/admin/CollectionsPage';
import { CompaniesTablePageState } from '@/pages/admin/CompaniesTablePage';
import { QuestionsTablePageState } from '@/pages/admin/QuestionsTablePage';
import { ResourcesAllTabState, ResourcesRequestsTabState } from '@/pages/admin/ResourcesPage';
import { SkillsPageState } from '@/pages/admin/SkillsPage';
import { SpecializationsPageState } from '@/pages/admin/SpecializationsPage';
import { UsersPageState } from '@/pages/admin/UserTablePage';
import { SkillsProficiencyPageState } from '@/pages/analytics/SkillsProficiencyPage';
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
	activeSubscription: ActiveSubscriptionState;
	interviewHistoryPage: InterviewHistoryState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
	questionsTablePage: QuestionsTablePageState;
	companiesTablePage: CompaniesTablePageState;
	resourcesAllTab: ResourcesAllTabState;
	resourcesRequestsTab: ResourcesRequestsTabState;
	specializationsPage: SpecializationsPageState;
	skillsPage: SkillsPageState;
	usersPage: UsersPageState;
	profile: ProfileState;
	collectionsPage: CollectionsPageState;
	skillsProficiencyPage: SkillsProficiencyPageState;
}
