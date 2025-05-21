import { useMatch } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Loader } from '@/shared/ui/Loader';

import { CreatePublicQuizPageSkeleton } from '@/pages/landing/CreatePublicQuizPage';
import { PublicQuestionPageSkeleton } from '@/pages/landing/PublicQuestionPage';
import { PublicQuestionsPageSkeleton } from '@/pages/landing/PublicQuestionsPage';
import { PublicQuizPageSkeleton } from '@/pages/landing/PublicQuizPage';
import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage';

export const SkeletonGenerator = () => {
	const isQuizPage = useMatch(ROUTES.quiz.page);
	const isNewQuizPage = useMatch(ROUTES.quiz.new.page);
	const isQuizResultPage = useMatch(ROUTES.quiz.result.page);
	const isQuestionsPage = useMatch(ROUTES.questions.page);
	const isQuestionDetailPage = useMatch(ROUTES.questions.detail.page);

	if (isQuizPage) return <CreatePublicQuizPageSkeleton />;
	if (isNewQuizPage) return <PublicQuizPageSkeleton />;
	if (isQuizResultPage) return <PublicQuizResultPageSkeleton />;
	if (isQuestionsPage) return <PublicQuestionsPageSkeleton />;
	if (isQuestionDetailPage) return <PublicQuestionPageSkeleton />;

	return <Loader />;
};
