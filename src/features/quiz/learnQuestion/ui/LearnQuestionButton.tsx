import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ActionsButton } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

import styles from './LearnQuestionButton.module.css';

interface LearnQuestionProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	onSuccess?: () => void;
}

export const LearnQuestionButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
	isPopover = false,
	variant = 'tertiary',
	onSuccess,
}: LearnQuestionProps) => {
	const [learnQuestion, { isLoading }] = useLearnQuestionMutation();
	const { t } = useI18nHelpers(i18Namespace.translation);
	const handleLearnQuestion = async () => {
		try {
			await learnQuestion({
				profileId: String(profileId),
				questionId: Number(questionId),
				isLearned: true,
			}).unwrap();
			onSuccess?.();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Не удалось изучить вопрос:', error);
		}
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			className={isPopover ? styles.button : ''}
			preffix={<Icon icon="student" size={iconSize} />}
			variant={variant}
			onClick={handleLearnQuestion}
			disabled={isLoading || isDisabled}
		>
			{t(ActionsButton.LEARN)}
		</Button>
	);
};
