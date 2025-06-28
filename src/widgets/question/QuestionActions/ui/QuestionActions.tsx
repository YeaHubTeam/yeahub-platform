import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FavoriteQuestionButton } from '@/features/question/favoriteQuestion';
import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

interface QuestionActionsProps {
	questionId: number | string;
	checksCount: number | undefined;
	isFavorite: boolean | undefined;
}

export const QuestionActions = ({
	questionId,
	checksCount = 0,
	isFavorite,
}: QuestionActionsProps) => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<Card withOutsideShadow>
			<Flex justify="center" gap="40" align="center">
				<LearnQuestionButton
					questionId={questionId}
					checksCount={checksCount}
					variant={buttonVariant}
					placementTooltip="top"
					offsetTooltip={5}
				/>
				<ResetQuestionStudyProgressButton
					questionId={questionId}
					checksCount={checksCount}
					variant={buttonVariant}
					placementTooltip="top"
					offsetTooltip={5}
				/>
				<FavoriteQuestionButton questionId={questionId} isFavorite={isFavorite} />
			</Flex>
		</Card>
	);
};
