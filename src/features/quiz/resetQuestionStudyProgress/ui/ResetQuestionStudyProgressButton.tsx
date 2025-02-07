import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';

import styles from './ResetQuestionStudyProgressButton.module.css';

interface ResetQuestionStudyProgressProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	onSuccess?: () => void;
}

export const ResetQuestionStudyProgressButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
	isPopover = false,
	variant = 'tertiary',
	onSuccess,
}: ResetQuestionStudyProgressProps) => {
	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();
	const { t } = useTranslation(i18Namespace.questions);

	const handleClick = async () => {
		try {
			await resetQuestion({ profileId, questionId }).unwrap();
			onSuccess?.();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Не удалось сбросить прогресс вопроса:', error);
		}
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			className={isPopover ? styles.button : ''}
			preffix={<Icon icon="clockCounterClockwise" color="black-600" size={iconSize} />}
			variant={variant}
			onClick={handleClick}
			disabled={isLoading || isDisabled}
		>
			{t(Questions.REPEAT)}
		</Button>
	);
};
