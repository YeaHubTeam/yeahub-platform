import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
	checksCount: number | undefined;
}

export const QuestionActions = ({ profileId, questionId, checksCount }: QuestionActionsProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const { data: profile } = useProfileQuery();

	const buttonVariant = isMobile || isTablet ? 'link-gray' : 'tertiary';
	const isEmailVerified = profile?.isEmailVerified;

	return (
		<Card>
			<Flex justify="center" gap="40" align="center">
				<LearnQuestionButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount >= 3)}
					variant={buttonVariant}
				/>
				<ResetQuestionStudyProgressButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount === 0)}
					variant={buttonVariant}
				/>
			</Flex>
		</Card>
	);
};
