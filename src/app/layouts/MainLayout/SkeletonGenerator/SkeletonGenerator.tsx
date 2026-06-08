import { matchPath, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { CollectionCreateFormSkeleton } from '@/features/collections/createCollection';
import { EditProfileFormSkeleton } from '@/features/profile/editProfileForm';
import { QuestionCreateFormSkeleton } from '@/features/question/createQuestion';

import { CollectionsPageSkeleton } from '@/pages/admin/collection/collections';
import { CompaniesTablePageSkeleton } from '@/pages/admin/company/companies';
import { CompanyDetailPageSkeleton } from '@/pages/admin/company/companyDetail';
import { QuestionPageContentSkeleton } from '@/pages/admin/question/questionDetail';
import { QuestionsTablePageSkeleton } from '@/pages/admin/question/questions';
import { ReferralLinkCreatePageSkeleton } from '@/pages/admin/referralLink/ReferralLinkCreate';
import { SkillsPageSkeleton } from '@/pages/admin/skill/skills';
import { SpecializationsPageSkeleton } from '@/pages/admin/specialization/specializations';
import { TaskCreatePageSkeleton } from '@/pages/admin/task/taskCreate';
import { UsersTablePageSkeleton } from '@/pages/admin/user/users';
import { AnalyticsPageSkeleton } from '@/pages/analytics/analytics';
import { CreateQuizPageSkeleton } from '@/pages/interview/createQuiz';
import { InterviewPageSkeleton } from '@/pages/interview/interview';
import { InterviewHistoryPageSkeleton } from '@/pages/interview/interviewHistory';
import { InterviewQuizPageSkeleton } from '@/pages/interview/interviewQuiz';
import { InterviewQuizResultPageSkeleton } from '@/pages/interview/interviewQuizResult';
import { InterviewStatisticsPageSkeleton } from '@/pages/interview/interviewStatistics';
import { MainPageSkeleton } from '@/pages/interview/main';
import { ProfilePageSkeleton } from '@/pages/profile/profileInfo';
import { TaskPageContentSkeleton } from '@/pages/tasks/task';
import { QuestionsPageSkeleton } from '@/pages/wiki/question/questions';

const SkeletonGenerator = () => {
	const location = useLocation();

	const isInterviewResultPage = matchPath(ROUTES.interview.history.result.page, location.pathname);
	const isAdminQuestionDetailsPage =
		matchPath(ROUTES.admin.questions.details.page, location.pathname) &&
		!matchPath(ROUTES.admin.questions.details.page, ROUTES.admin.questions.create.page);
	const isTaskDetailsPage = matchPath(ROUTES.tasks.detail.page, location.pathname);
	const isCompanyDetailsPage = matchPath(ROUTES.admin.companies.details.page, location.pathname);

	if (isInterviewResultPage) {
		return <InterviewQuizResultPageSkeleton />;
	}

	if (isAdminQuestionDetailsPage) {
		return <QuestionPageContentSkeleton />;
	}

	if (isTaskDetailsPage) {
		return <TaskPageContentSkeleton />;
	}

	if (isCompanyDetailsPage) {
		return <CompanyDetailPageSkeleton />;
	}

	switch (location.pathname) {
		case ROUTES.appRoute:
			return <MainPageSkeleton />;
		case ROUTES.interview.page:
			return <InterviewPageSkeleton />;
		case ROUTES.interview.new.page:
			return <InterviewQuizPageSkeleton />;
		case ROUTES.interview.history.page:
			return <InterviewHistoryPageSkeleton />;
		case ROUTES.interview.statistic.page:
			return <InterviewStatisticsPageSkeleton />;
		case ROUTES.interview.quiz.page:
			return <CreateQuizPageSkeleton />;
		case ROUTES.wiki.questions.page:
			return <QuestionsPageSkeleton />;
		case ROUTES.profile.page:
			return <ProfilePageSkeleton />;
		case ROUTES.profile.edit.page:
			return <EditProfileFormSkeleton />;
		case ROUTES.admin.questions.create.page:
			return <QuestionCreateFormSkeleton />;
		case ROUTES.admin.collections.create.page:
			return <CollectionCreateFormSkeleton />;
		case ROUTES.admin.questions.page:
			return <QuestionsTablePageSkeleton />;
		case ROUTES.admin.specializations.page:
			return <SpecializationsPageSkeleton />;
		case ROUTES.admin.skills.page:
			return <SkillsPageSkeleton />;
		case ROUTES.admin.users.page:
			return <UsersTablePageSkeleton />;
		case ROUTES.admin.collections.page:
			return <CollectionsPageSkeleton />;
		case ROUTES.admin.companies.page:
			return <CompaniesTablePageSkeleton />;
		case ROUTES.admin.referralLinks.create.page:
			return <ReferralLinkCreatePageSkeleton />;
		case ROUTES.analytics.page:
			return <AnalyticsPageSkeleton />;
		case ROUTES.admin.tasks.create.page:
			return <TaskCreatePageSkeleton />;
		default:
			return <Loader />;
	}
};

export default SkeletonGenerator;
