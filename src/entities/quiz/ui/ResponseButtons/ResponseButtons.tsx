import classNames from 'classnames';
import { Button, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { QuizQuestionAnswerType } from '../../model/types/quiz';

import styles from './ResponseButtons.module.css';

interface ResponseButtonsProps {
	className?: string;
	answer: string;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
}

export const ResponseButtons = ({ className, answer, changeAnswer }: ResponseButtonsProps) => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);
	const { isMobile } = useScreenSize();

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'UNKNOWN' })}
				onClick={() => changeAnswer('UNKNOWN')}
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && t('buttons.doNotKnow')}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'KNOWN' })}
				onClick={() => changeAnswer('KNOWN')}
				textClassName={styles['action-button']}
				size="small"
				theme="tertiary"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && t('buttons.iKnow')}
			</Button>
		</div>
	);
};
