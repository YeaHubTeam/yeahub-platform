import { matchPath, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { EditProfileFormSkeleton } from '@/features/profile/editProfileForm';

import { CollectionsPageSkeleton } from '@/pages/admin/collection/collections';
import { CompaniesTablePageSkeleton } from '@/pages/admin/company/companies';
import { QuestionPageSkeleton } from '@/pages/admin/question/questionDetail';
import { QuestionsTablePageSkeleton } from '@/pages/admin/question/questions';
import { SkillsPageSkeleton } from '@/pages/admin/skill/skills';
import { SpecializationsPageSkeleton } from '@/pages/admin/specialization/specializations';
import { UsersTablePageSkeleton } from '@/pages/admin/user/users';
import { AnalyticsPageSkeleton } from '@/pages/analytics/analytics';
import { DifficultQuestionsPageSkeleton } from '@/pages/analytics/difficultQuestions';
import { PopularQuestionsPageSkeleton } from '@/pages/analytics/popularQuestions';
import { PopularSkillsPageSkeleton } from '@/pages/analytics/popularSkills';
import { ProgressSpecializationsPageSkeleton } from '@/pages/analytics/progressSpecializations';
import { SkillsProficiencyPageSkeleton } from '@/pages/analytics/skillsProficiency';
import { CreateQuizPageSkeleton } from '@/pages/interview/createQuiz';
import { InterviewPageSkeleton } from '@/pages/interview/interview';
import { InterviewHistoryPageSkeleton } from '@/pages/interview/interviewHistory';
import { InterviewQuizPageSkeleton } from '@/pages/interview/interviewQuiz';
import { InterviewQuizResultPageSkeleton } from '@/pages/interview/interviewQuizResult';
import { InterviewStatisticsPageSkeleton } from '@/pages/interview/interviewStatistics';
import { MainPageSkeleton } from '@/pages/interview/main';
import { MediaPageSkeleton } from '@/pages/landing/media';
import { ProfilePageSkeleton } from '@/pages/profile/profileInfo';
import { QuestionsPageSkeleton } from '@/pages/wiki/question/questions';

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
		case ROUTES.analytics.progressSpecializations.route:
			return <ProgressSpecializationsPageSkeleton />;
		case ROUTES.analytics['skills-proficiency'].route:
			return <SkillsProficiencyPageSkeleton />;
		case ROUTES.analytics['popular-skills'].route:
			return <PopularSkillsPageSkeleton />;
		case ROUTES.analytics['popular-questions'].route:
			return <PopularQuestionsPageSkeleton />;
		case ROUTES.analytics['difficult-questions'].route:
			return <DifficultQuestionsPageSkeleton />;
		case ROUTES.analytics.page:
			return <AnalyticsPageSkeleton />;
		default:
			return <Loader />;
	}
};

export default SkeletonGenerator;
