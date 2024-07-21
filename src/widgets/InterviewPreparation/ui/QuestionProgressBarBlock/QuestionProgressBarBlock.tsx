import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { QuestionProgressBar } from '@/entities/interview';

import styles from './QuestionProgressBarBlock.module.css';

export const QuestionProgressBarBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<div>
			<QuestionProgressBar />
			<p className={styles.question}>
				{t('preparation.progressBarTitle', 'Вопрос викторины', {
					fromQuestionNumber: 10,
					toQuestionNumber: 45,
				})}
			</p>
		</div>
	);
};
