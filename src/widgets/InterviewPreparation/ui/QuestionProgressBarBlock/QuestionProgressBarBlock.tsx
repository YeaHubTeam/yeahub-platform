import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { QuestionProgressBar } from '@/entities/quiz';

import styles from './QuestionProgressBarBlock.module.css';

export const QuestionProgressBarBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<div>
			<QuestionProgressBar currentCount={10} totalCount={45} />
			<p className={styles.question}>
				{t('preparation.progressBarTitle', null, {
					fromQuestionNumber: 10,
					toQuestionNumber: 45,
				})}
			</p>
		</div>
	);
};
