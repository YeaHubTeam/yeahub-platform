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
		case ROUTES.public.quiz.page:
			return <CreatePublicQuizPageSkeleton data-testid="CreatePublicQuizPageSkeleton" />;
		case ROUTES.public.quiz.new.page:
			return <PublicQuizPageSkeleton dataTestId="PublicQuizPageSkeleton" />;
		case ROUTES.public.quiz.result.page:
			return <PublicQuizResultPageSkeleton dataTestId="PublicQuizResultPageSkeleton" />;
		case ROUTES.public.questions.page:
			return <PublicQuestionsPageSkeleton dataTestId="PublicQuestionsPageSkeleton" />;
		case ROUTES.public.questions.detail.page:
			return <PublicQuestionPageSkeleton dataTestId="PublicQuestionPageSkeleton" />;
		case ROUTES.public.media.page:
			return <MediaPageSkeleton />;
		case ROUTES.public.hhAnalytics.page:
			return <HhAnalyticsPageSkeleton />;
		case ROUTES.public.avos.page:
			return <AvosPageSkeleton />;
		case ROUTES.public.learning.page:
			return <LearningPageSkeleton />;
		case ROUTES.public.docs.page:
			return <DocsPageSkeleton />;
		default:
			return <Loader />;
	}
};
