import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { AvosPageSkeleton } from '@/pages/landing/avos';
import { CreatePublicQuizPageSkeleton } from '@/pages/landing/createPublicQuiz';
import { DocsPageSkeleton } from '@/pages/landing/docs';
import { HhAnalyticsPageSkeleton } from '@/pages/landing/hhAnalytics';
import { LandingPageSkeleton } from '@/pages/landing/landing';
import { LearningPageSkeleton } from '@/pages/landing/learning';
import { MediaPageSkeleton } from '@/pages/landing/media';
import { PublicQuestionPageSkeleton } from '@/pages/landing/publicQuestion';
import { PublicQuestionsPageSkeleton } from '@/pages/landing/publicQuestions';
import { PublicQuizPageSkeleton } from '@/pages/landing/publicQuiz';
import { PublicQuizResultPageSkeleton } from '@/pages/landing/publicQuizResult';

export const SkeletonGenerator = () => {
	switch (location.pathname) {
		case ROUTES.appRoute:
			return <LandingPageSkeleton data-testid="LandingPageSkeleton" />;
		case ROUTES.quiz.page:
			return <CreatePublicQuizPageSkeleton data-testid="CreatePublicQuizPageSkeleton" />;
		case ROUTES.quiz.new.page:
			return <PublicQuizPageSkeleton dataTestId="PublicQuizPageSkeleton" />;
		case ROUTES.quiz.result.page:
			return <PublicQuizResultPageSkeleton dataTestId="PublicQuizResultPageSkeleton" />;
		case ROUTES.questions.page:
			return <PublicQuestionsPageSkeleton dataTestId="PublicQuestionsPageSkeleton" />;
		case ROUTES.questions.detail.page:
			return <PublicQuestionPageSkeleton dataTestId="PublicQuestionPageSkeleton" />;
		case ROUTES.media.page:
			return <MediaPageSkeleton />;
		case ROUTES.hhAnalytics.page:
			return <HhAnalyticsPageSkeleton />;
		case ROUTES.avos.page:
			return <AvosPageSkeleton />;
		case ROUTES.learning.page:
			return <LearningPageSkeleton />;
		case ROUTES.docs.page:
			return <DocsPageSkeleton />;
		default:
			return <Loader />;
	}
};
