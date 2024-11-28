import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

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
				variant="tertiary"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t('buttons.doNotKnow')}</span>}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'KNOWN' })}
				onClick={() => changeAnswer('KNOWN')}
				variant="tertiary"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t('buttons.iKnow')}</span>}
			</Button>
		</div>
	);
};
