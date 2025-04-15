import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { QuizQuestionAnswerType } from '../../model/types/quiz';
import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface QuestionNavPanelProps {
	answer: QuizQuestionAnswerType;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
	showResponseButtons?: boolean;
	questionNumber: number;
	totalCount: number;
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
}

export const QuestionNavPanel = ({
	answer,
	changeAnswer,
	showResponseButtons = false,
	questionNumber,
	totalCount,
	goToNextSlide,
	goToPrevSlide,
}: QuestionNavPanelProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<Flex justify="between">
			<Flex className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={goToPrevSlide}
					aria-label={t(InterviewQuiz.A11Y_PREV)}
					fullWidth
					suffix={<Icon icon="altArrowLeft" size={20} color="purple-700" />}
					variant="outline"
					disabled={questionNumber === 1}
				/>
			</Flex>
			{showResponseButtons && <ResponseButtons answer={answer} changeAnswer={changeAnswer} />}
			<Flex className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={goToNextSlide}
					preffix={<Icon color="purple-700" icon="altArrowRight" size={20} />}
					fullWidth
					variant="outline"
					aria-label={t(InterviewQuiz.A11Y_NEXT)}
					disabled={questionNumber === totalCount || !answer}
				/>
			</Flex>
		</Flex>
	);
};
