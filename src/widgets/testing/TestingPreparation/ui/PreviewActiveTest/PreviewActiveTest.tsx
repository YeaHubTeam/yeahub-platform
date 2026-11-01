import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuiz } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import type { ActiveTest } from '@/entities/testing';

import styles from './PreviewActiveTest.module.css';

interface PreviewActiveTestProps {
	activeTest: ActiveTest;
}

export const PreviewActiveTest = ({ activeTest }: PreviewActiveTestProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const currentQuestion = activeTest.questions[0];

	if (!currentQuestion) {
		return null;
	}

	const answeredCount = activeTest.response.answers.filter(
		(answer) => answer.answer.length > 0,
	).length;

	return (
		<Flex direction="column" gap="16" className={styles.preparation}>
			<ProgressBar
				currentCount={answeredCount}
				totalCount={activeTest.fullCount}
				label={t(InterviewQuiz.PROGRESS_BAR_TITLE, {
					fromQuestionNumber: answeredCount,
					toQuestionNumber: activeTest.fullCount,
				})}
			/>
			<Text variant="body4" maxRows={1}>
				{currentQuestion.title}
			</Text>
			<ImageWithWrapper
				src={currentQuestion.imageSrc}
				alt={currentQuestion.title}
				className={styles['image-wrapper']}
			/>
		</Flex>
	);
};
