import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

interface QuestionActionsProps {
	questionId: number | string;
	checksCount: number | undefined;
}

export const QuestionActions = ({ questionId, checksCount = 0 }: QuestionActionsProps) => {
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
			</Flex>
		</Card>
	);
};
