import { matchPath, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Loader } from '@/shared/ui/Loader';

import { EditProfileFormSkeleton } from '@/features/profile/editProfileForm';

import { CollectionsPageSkeleton } from '@/pages/admin/CollectionsPage';
import { CompaniesTablePageSkeleton } from '@/pages/admin/CompaniesTablePage';
import { QuestionPageSkeleton } from '@/pages/admin/QuestionPage';
import { QuestionsTablePageSkeleton } from '@/pages/admin/QuestionsTablePage';
import { SkillsPageSkeleton } from '@/pages/admin/SkillsPage';
import { SpecializationsPageSkeleton } from '@/pages/admin/SpecializationsPage';
import { UsersTablePageSkeleton } from '@/pages/admin/UserTablePage';
import { CreateQuizPageSkeleton } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryPageSkeleton } from '@/pages/interview/InterviewHistoryPage';
import { InterviewPageSkeleton } from '@/pages/interview/InterviewPage';
import { InterviewQuizPageSkeleton } from '@/pages/interview/InterviewQuizPage';
import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';
import { InterviewStatisticsPageSkeleton } from '@/pages/interview/InterviewStatisticsPage';
import { MainPageSkeleton } from '@/pages/interview/MainPage';
import { QuestionsPageSkeleton } from '@/pages/interview/QuestionsPage';
import { MediaPageSkeleton } from '@/pages/landing/MediaPage';
import { ProfilePageSkeleton } from '@/pages/profile/ProfilePage';

const SkeletonGenerator = () => {
	const location = useLocation();

	const isInterviewResultPage = matchPath(ROUTES.interview.history.result.page, location.pathname);
	const isAdminQuestionDetailsPage = matchPath(
		ROUTES.admin.questions.details.page,
		location.pathname,
	);

	if (isInterviewResultPage) {
		return <InterviewQuizResultPageSkeleton />;
	}

	if (isAdminQuestionDetailsPage) {
		return <QuestionPageSkeleton />;
	}

	switch (location.pathname) {
		case ROUTES.platformRoute:
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
		case ROUTES.media.page:
			return <MediaPageSkeleton />;
		default:
			return <Loader />;
	}
};

export default SkeletonGenerator;
