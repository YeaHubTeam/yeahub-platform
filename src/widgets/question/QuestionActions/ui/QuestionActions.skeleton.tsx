import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FavoriteQuestionButtonSkeleton } from '@/features/question/favoriteQuestion';
import { QuestionNavigationButtonsSkeleton } from '@/features/question/navigateQuestion';
import { LearnQuestionButtonSkeleton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButtonSkeleton } from '@/features/quiz/resetQuestionStudyProgress';

export const QuestionActionsSkeleton = () => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<CardSkeleton withOutsideShadow>
			<Flex direction="column" gap="12">
				<Flex justify="center" gap="40" align="center">
					<LearnQuestionButtonSkeleton width={120} variant={buttonVariant} />
					<ResetQuestionStudyProgressButtonSkeleton width={120} variant={buttonVariant} />
					<FavoriteQuestionButtonSkeleton width={120} variant={buttonVariant} />
				</Flex>
				<QuestionNavigationButtonsSkeleton width={120} variant={buttonVariant} />
			</Flex>
		</CardSkeleton>
	);
};
