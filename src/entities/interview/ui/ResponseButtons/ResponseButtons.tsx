import { Icon, Button } from 'yeahub-ui-kit';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './ResponseButtons.module.css';

export const ResponseButtons = ({ className }: { className?: string }) => {
	const { t } = useI18nHelpers();

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={24} />}
			>
				{t('quizButtons.doNotKnow', 'Не знаю')}
			</Button>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="clockCounterClockwise" icon="clockCounterClockwise" size={24} />}
			>
				{t('quizButtons.repeat', 'Повторить')}
			</Button>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={24} />}
			>
				{t('quizButtons.IKnow', 'Знаю')}
			</Button>
		</div>
	);
};
