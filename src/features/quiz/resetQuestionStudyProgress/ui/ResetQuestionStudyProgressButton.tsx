import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ActionsButton } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';

interface ResetQuestionStudyProgressProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	variant?: 'tertiary' | 'link-gray';
}

export const ResetQuestionStudyProgressButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
	variant = 'tertiary',
}: ResetQuestionStudyProgressProps) => {
	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();
	const { t } = useI18nHelpers(i18Namespace.translation);

	const handleClick = async () => {
		try {
			await resetQuestion({ profileId, questionId }).unwrap();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Не удалось сбросить прогресс вопроса:', error);
		}
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			preffix={<Icon icon="clockCounterClockwise" key={'clockCounterClockwise'} size={iconSize} />}
			variant={variant}
			onClick={handleClick}
			disabled={isLoading || isDisabled}
		>
			{t(ActionsButton.REPEAT)}
		</Button>
	);
};
