import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { QuizQuestionAnswerType } from '../../model/types/quiz';

import styles from './ResponseButtons.module.css';

interface ResponseButtonsProps {
	className?: string;
	answer: string;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
	favoriteButton?: React.ReactNode;
}

export const ResponseButtons = ({
	className,
	answer,
	changeAnswer,
	favoriteButton,
}: ResponseButtonsProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const { isMobile } = useScreenSize();

	return (
		<Flex gap="8" className={classNames(styles.wrapper, className)}>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'UNKNOWN' })}
				onClick={() => changeAnswer('UNKNOWN')}
				variant="tertiary"
				preffix={<Icon icon="dislike" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t(InterviewQuiz.ANSWER_DO_NOT_KNOW)}</span>}
			</Button>
			<Button
				className={classNames(styles.btn, { [styles['active-btn']]: answer === 'KNOWN' })}
				onClick={() => changeAnswer('KNOWN')}
				variant="tertiary"
				preffix={<Icon icon="like" size={isMobile ? 32 : 24} />}
				fullWidth={isMobile}
			>
				{!isMobile && <span>{t(InterviewQuiz.ANSWER_KNOW)}</span>}
			</Button>
			{favoriteButton}
		</Flex>
	);
};
