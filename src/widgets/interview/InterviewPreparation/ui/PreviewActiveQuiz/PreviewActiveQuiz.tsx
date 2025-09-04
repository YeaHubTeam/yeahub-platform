import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getLastActiveQuizInfo } from '@/entities/quiz';

import styles from './PreviewActiveQuiz.module.css';

export const PreviewActiveQuiz = () => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const lastActiveQuizInfo = useAppSelector(getLastActiveQuizInfo);
	if (!lastActiveQuizInfo) {
		return null;
	}

	return (
		<Flex direction="column" gap="16" className={styles.preparation}>
			<ProgressBar
				currentCount={lastActiveQuizInfo.answeredCount ?? lastActiveQuizInfo.toQuestionNumber}
				totalCount={lastActiveQuizInfo.toQuestionNumber}
				label={t(InterviewQuiz.PROGRESS_BAR_TITLE, {
					fromQuestionNumber: lastActiveQuizInfo.fromQuestionNumber,
					toQuestionNumber: lastActiveQuizInfo.toQuestionNumber,
				})}
			/>
			<Text variant="body4" maxRows={1}>
				{lastActiveQuizInfo.question.questionTitle}
			</Text>
			<ImageWithWrapper
				src={lastActiveQuizInfo.question.imageSrc}
				alt={lastActiveQuizInfo.question.questionTitle}
				className={styles['image-wrapper']}
			/>
		</Flex>
	);
};
