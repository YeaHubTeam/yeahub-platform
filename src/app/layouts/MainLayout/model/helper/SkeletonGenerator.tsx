import { useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Loader } from '@/shared/ui/Loader';

import { EditProfileFormSkeleton } from '@/features/profile/editProfileForm';

import { QuestionPageSkeleton } from '@/pages/admin/QuestionPage';
import { CreateQuizPageSkeleton } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryPageSkeleton } from '@/pages/interview/InterviewHistoryPage';
import { InterviewPageSkeleton } from '@/pages/interview/InterviewPage';
import { InterviewQuizPageSkeleton } from '@/pages/interview/InterviewQuizPage';
import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';
import { MainPageSkeleton } from '@/pages/interview/MainPage';
import { QuestionsPageSkeleton } from '@/pages/interview/QuestionsPage';
import { ProfilePageSkeleton } from '@/pages/profile/ProfilePage';

const SkeletonGenerator = () => {
	const location = useLocation();

	switch (location.pathname) {
		case ROUTES.platformRoute:
			return <MainPageSkeleton />;
		case ROUTES.interview.page:
			return <InterviewPageSkeleton />;
		case ROUTES.interview.new.page:
			return <InterviewQuizPageSkeleton />;
		case ROUTES.interview.history.page:
			return <InterviewHistoryPageSkeleton />;
		case ROUTES.interview.history.result.page:
			return <InterviewQuizResultPageSkeleton />;
		case ROUTES.interview.questions.page:
			return <QuestionsPageSkeleton />;
		case ROUTES.interview.quiz.page:
			return <CreateQuizPageSkeleton />;
		case ROUTES.profile.page:
			return <ProfilePageSkeleton />;
		case ROUTES.profile.edit.page:
			return <EditProfileFormSkeleton />;
		case ROUTES.admin.questions.details.page:
			return <QuestionPageSkeleton />;

		default:
			return <Loader />;
	}
};

export default SkeletonGenerator;
