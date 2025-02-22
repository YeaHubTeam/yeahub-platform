import { useTranslation } from 'react-i18next';

import NoActiveQuizPlaceholder from '@/shared/assets/images/NoActiveQuizPlaceholder.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { Text } from '@/shared/ui/Text';

import styles from './PreviewInactiveQuiz.module.css';

export const PreviewInactiveQuiz = () => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<div className={styles['preparation-empty']}>
			<Text variant="body4">{t(InterviewQuiz.START_QUIZ_TITLE)}</Text>
			<Text variant="body2-accent" color="black-600" className={styles['inactive-description']}>
				{t(InterviewQuiz.START_QUIZ_DESCRIPTION)}
			</Text>
			<img
				className={styles['preparation-noactiveimage']}
				src={NoActiveQuizPlaceholder}
				alt="no active quiz"
			/>
		</div>
	);
};
