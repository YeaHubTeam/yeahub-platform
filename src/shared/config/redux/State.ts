import { baseApi } from '@/shared/config';

import { ProfileState } from '@/entities/profile';
import { ActiveQuizState } from '@/entities/quiz';
import { ActiveSubscriptionState } from '@/entities/subscription';

import { CollectionsPageState } from '@/pages/admin/collection/collections';
import { CompaniesTablePageState } from '@/pages/admin/company/companies';
import { QuestionsTablePageState } from '@/pages/admin/question/questions';
import { ResourcesAllTabState, ResourcesRequestsTabState } from '@/pages/admin/resource/resources';
import { SkillsPageState } from '@/pages/admin/skill/skills';
import { SpecializationsPageState } from '@/pages/admin/specialization/specializations';
import { InterviewHistoryState } from '@/pages/interview/interviewHistory';

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
}
