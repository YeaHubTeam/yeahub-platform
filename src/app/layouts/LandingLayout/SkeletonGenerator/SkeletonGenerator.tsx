import { useMatch } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { AvosPageSkeleton } from '@/pages/landing/avos';
import { CreatePublicQuizPageSkeleton } from '@/pages/landing/createPublicQuiz';
import { HhAnalyticsPageSkeleton } from '@/pages/landing/hhAnalytics';
import { LandingPageSkeleton } from '@/pages/landing/landing';
import { LearningPageSkeleton } from '@/pages/landing/learning';
import { MediaPageSkeleton } from '@/pages/landing/media';
import { PublicQuestionPageSkeleton } from '@/pages/landing/publicQuestion';
import { PublicQuestionsPageSkeleton } from '@/pages/landing/publicQuestions';
import { PublicQuizPageSkeleton } from '@/pages/landing/publicQuiz';
import { PublicQuizResultPageSkeleton } from '@/pages/landing/publicQuizResult';

export const SkeletonGenerator = () => {
	const isLandingPage = useMatch(ROUTES.appRoute);
	const isQuizPage = useMatch(ROUTES.quiz.page);
	const isNewQuizPage = useMatch(ROUTES.quiz.new.page);
	const isQuizResultPage = useMatch(ROUTES.quiz.result.page);
	const isQuestionsPage = useMatch(ROUTES.questions.page);
	const isQuestionDetailPage = useMatch(ROUTES.questions.detail.page);
	const isMediaPage = useMatch(ROUTES.media.page);
	const isHhAnalyticsPage = useMatch(ROUTES.hhAnalytics.page);
	const isAvosPage = useMatch(ROUTES.avos.page);
	const isLearningPage = useMatch(ROUTES.learning.page);

	if (isLandingPage) return <LandingPageSkeleton data-testid="LandingPageSkeleton" />;
	if (isQuizPage)
		return <CreatePublicQuizPageSkeleton data-testid="CreatePublicQuizPageSkeleton" />;
	if (isNewQuizPage) return <PublicQuizPageSkeleton dataTestId="PublicQuizPageSkeleton" />;
	if (isQuizResultPage)
		return <PublicQuizResultPageSkeleton dataTestId="PublicQuizResultPageSkeleton" />;
	if (isQuestionsPage)
		return <PublicQuestionsPageSkeleton dataTestId="PublicQuestionsPageSkeleton" />;
	if (isQuestionDetailPage)
		return <PublicQuestionPageSkeleton dataTestId="PublicQuestionPageSkeleton" />;
	if (isMediaPage) return <MediaPageSkeleton />;
	if (isHhAnalyticsPage) return <HhAnalyticsPageSkeleton />;
	if (isAvosPage) return <AvosPageSkeleton />;
	if (isLearningPage) return <LearningPageSkeleton />;

	return <Loader />;
};
