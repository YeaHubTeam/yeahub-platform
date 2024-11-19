import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ActionsButton } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

interface LearnQuestionProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	variant?: 'tertiary' | 'link-gray';
}

export const LearnQuestionButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
	variant = 'tertiary',
}: LearnQuestionProps) => {
	const [learnQuestion, { isLoading }] = useLearnQuestionMutation();
	const { t } = useI18nHelpers(i18Namespace.translation);
	const handleLearnQuestion = () => {
		return learnQuestion({
			profileId: String(profileId),
			questionId: Number(questionId),
			isLearned: true,
		});
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			preffix={<Icon icon="student" size={iconSize} />}
			variant={variant}
			onClick={handleLearnQuestion}
			disabled={isLoading || isDisabled}
		>
			{t(ActionsButton.LEARN)}
		</Button>
	);
};
