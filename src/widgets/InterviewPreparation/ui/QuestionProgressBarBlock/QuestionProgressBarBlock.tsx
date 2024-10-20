import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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
	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<div>
			<QuestionProgressBar currentCount={fromQuestionNumber} totalCount={toQuestionNumber} />
			<p className={styles.question}>
				{t('preparation.progressBarTitle', { fromQuestionNumber, toQuestionNumber })}
			</p>
		</div>
	);
};
