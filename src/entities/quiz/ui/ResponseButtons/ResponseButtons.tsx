import classNames from 'classnames';
import { Icon, Button } from 'yeahub-ui-kit';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './ResponseButtons.module.css';

interface ResponseButtonsProps {
	className?: string;
	answer: string;
	changeAnswer: (answer: string) => void;
}

export const ResponseButtons = ({ className, answer, changeAnswer }: ResponseButtonsProps) => {
	const { t } = useI18nHelpers();

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'UNKNOWN' })}
				onClick={() => changeAnswer('UNKNOWN')}
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={24} />}
			>
				{t('quizButtons.doNotKnow')}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'REPEAT' })}
				onClick={() => changeAnswer('REPEAT')}
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="clockCounterClockwise" icon="clockCounterClockwise" size={24} />}
			>
				{t('quizButtons.repeat')}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'KNOWN' })}
				onClick={() => changeAnswer('KNOWN')}
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={24} />}
			>
				{t('quizButtons.IKnow')}
			</Button>
		</div>
	);
};
