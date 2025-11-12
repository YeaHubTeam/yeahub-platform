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
import { DifficultQuestionsPageState } from '@/pages/analytics/DifficultQuestionsPage';
import { SkillsProficiencyPageState } from '@/pages/analytics/SkillsProficiencyPage';
import { InterviewHistoryState } from '@/pages/interview/InterviewHistoryPage';

import { baseApi } from '../api/baseApi';

export interface State {
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
	profile: ProfileState;
	collectionsPage: CollectionsPageState;
	skillsProficiencyPage: SkillsProficiencyPageState;
	difficultQuestionsPage: DifficultQuestionsPageState;
}
