import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { QuizQuestionAnswerType } from '../../model/types/quiz';

import styles from './ResponseButtons.module.css';

interface ResponseButtonsProps {
	className?: string;
	answer: string;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
}

export const ResponseButtons = ({ className, answer, changeAnswer }: ResponseButtonsProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const { isMobile } = useScreenSize();

	return (
		<Flex gap="8" className={classNames(styles.wrapper, className)}>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'UNKNOWN' })}
				onClick={() => changeAnswer('UNKNOWN')}
				variant="tertiary"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t(InterviewQuiz.ANSWER_DO_NOT_KNOW)}</span>}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'KNOWN' })}
				onClick={() => changeAnswer('KNOWN')}
				variant="tertiary"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t(InterviewQuiz.ANSWER_KNOW)}</span>}
			</Button>
		</Flex>
	);
};
