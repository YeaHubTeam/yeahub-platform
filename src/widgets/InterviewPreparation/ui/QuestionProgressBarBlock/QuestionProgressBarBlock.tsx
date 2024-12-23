import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';

import { QuestionProgressBar } from '@/entities/quiz';

import styles from './QuestionProgressBarBlock.module.css';
interface QuestionProgressBarBlockProps {
	fromQuestionNumber: number;
	toQuestionNumber: number;
}
export const QuestionProgressBarBlock = ({
	fromQuestionNumber,
	toQuestionNumber,
}: QuestionProgressBarBlockProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	return (
		<div>
			<QuestionProgressBar currentCount={fromQuestionNumber} totalCount={toQuestionNumber} />
			<p className={styles.question}>
				{t(InterviewQuiz.PROGRESS_BAR_TITLE, { fromQuestionNumber, toQuestionNumber })}
			</p>
		</div>
	);
};
