import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FavoriteQuestionButton } from '@/features/question/favoriteQuestion';
import { QuestionNavigationButtons } from '@/features/question/navigateQuestion';
import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

interface QuestionActionsProps {
	questionId: number | string;
	checksCount: number | undefined;
	isFavorite: boolean | undefined;
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}

export const QuestionActions = ({
	questionId,
	checksCount = 0,
	isFavorite,
	onMoveNext,
	onMovePrev,
	isDisabled,
}: QuestionActionsProps) => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<Card withOutsideShadow>
			<Flex direction="column" gap="12">
				<Flex justify="center" align="center" direction="row" wrap="wrap" gap="20">
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
					<FavoriteQuestionButton
						questionId={questionId}
						isFavorite={isFavorite}
						variant={buttonVariant}
					/>
				</Flex>
				<QuestionNavigationButtons
					variant={buttonVariant}
					onMovePrev={onMovePrev}
					onMoveNext={onMoveNext}
					isDisabled={isDisabled}
				/>
			</Flex>
		</Card>
	);
};
