import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { A11y } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { QuizQuestionAnswerType } from '../../model/types/quiz';
import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface QuestionNavPanelProps {
	answer: QuizQuestionAnswerType;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
	showResponseButtons?: boolean;
	className?: string;
	questionNumber: number;
	totalCount: number;
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
}

export const QuestionNavPanel = ({
	answer,
	changeAnswer,
	showResponseButtons = false,
	className,
	questionNumber,
	totalCount,
	goToNextSlide,
	goToPrevSlide,
}: QuestionNavPanelProps) => {
	const { t } = useI18nHelpers(i18Namespace.a11y);

	return (
		<div className={classNames(styles.panel, className)}>
			<div className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={goToPrevSlide}
					aria-label={t(A11y.PREV_INTERVIEW_QUESTION)}
					fullWidth={true}
					suffix={
						<Icon icon="caretLeft" size={20} color="--palette-ui-purple-700" key="caretLeft" />
					}
					variant="outline"
					disabled={questionNumber === 1}
				/>
			</div>
			{showResponseButtons && (
				<ResponseButtons
					className={styles['action-btns']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			)}
			<div className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={goToNextSlide}
					preffix={
						<Icon color="--palette-ui-purple-700" icon="caretRight" size={20} key="caretRight" />
					}
					fullWidth={true}
					variant="outline"
					aria-label={t(A11y.NEXT_INTERVIEW_QUESTION)}
					disabled={questionNumber === totalCount || !answer}
				/>
			</div>
		</div>
	);
};
