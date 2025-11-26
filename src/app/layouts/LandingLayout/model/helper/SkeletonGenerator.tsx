import { useMatch } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Loader } from '@/shared/ui/Loader';

import { CreatePublicQuizPageSkeleton } from '@/pages/landing/CreatePublicQuizPage';
import { AnalyticsPageSkeleton } from '@/pages/landing/HhAnalyticsPage';
import { LandingPageSkeleton } from '@/pages/landing/LandingPage';
import { MediaPageSkeleton } from '@/pages/landing/MediaPage';
import { PublicQuestionPageSkeleton } from '@/pages/landing/PublicQuestionPage';
import { PublicQuestionsPageSkeleton } from '@/pages/landing/PublicQuestionsPage';
import { PublicQuizPageSkeleton } from '@/pages/landing/PublicQuizPage';
import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage';

export const SkeletonGenerator = () => {
	const isLandingPage = useMatch(ROUTES.appRoute);
	const isQuizPage = useMatch(ROUTES.quiz.page);
	const isNewQuizPage = useMatch(ROUTES.quiz.new.page);
	const isQuizResultPage = useMatch(ROUTES.quiz.result.page);
	const isQuestionsPage = useMatch(ROUTES.questions.page);
	const isQuestionDetailPage = useMatch(ROUTES.questions.detail.page);
	const isMediaPage = useMatch(ROUTES.media.page);
	const isHhAnalyticsPage = useMatch(ROUTES.hhAnalytics.page);

	if (isLandingPage) return <LandingPageSkeleton data-testid={'LandingPageSkeleton'} />;
	if (isQuizPage)
		return <CreatePublicQuizPageSkeleton data-testid={'CreatePublicQuizPageSkeleton'} />;
	if (isNewQuizPage) return <PublicQuizPageSkeleton dataTestId={'PublicQuizPageSkeleton'} />;
	if (isQuizResultPage)
		return <PublicQuizResultPageSkeleton dataTestId={'PublicQuizResultPageSkeleton'} />;
	if (isQuestionsPage)
		return <PublicQuestionsPageSkeleton dataTestId={'PublicQuestionsPageSkeleton'} />;
	if (isQuestionDetailPage)
		return <PublicQuestionPageSkeleton dataTestId={'PublicQuestionPageSkeleton'} />;
	if (isMediaPage) return <MediaPageSkeleton />;
	if (isHhAnalyticsPage) return <AnalyticsPageSkeleton />;

	return <Loader />;
};
