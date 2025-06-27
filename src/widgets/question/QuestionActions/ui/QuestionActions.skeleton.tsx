import { useScreenSize } from '@/shared/hooks';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FavoriteQuestionButtonSkeleton } from '@/features/quiz/favoriteQuestion';
import { LearnQuestionButtonSkeleton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButtonSkeleton } from '@/features/quiz/resetQuestionStudyProgress';

export const QuestionActionsSkeleton = () => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<CardSkeleton withOutsideShadow>
			<Flex justify="center" gap="40" align="center">
				<LearnQuestionButtonSkeleton width={120} variant={buttonVariant} />
				<ResetQuestionStudyProgressButtonSkeleton width={120} variant={buttonVariant} />
				<FavoriteQuestionButtonSkeleton width={120} variant={buttonVariant} />
			</Flex>
		</CardSkeleton>
	);
};
