import { Flex } from '@/shared/ui/Flex';

import { PassedQuestionsListSkeleton } from '@/widgets/interview/PassedQuestionsList';
import { QuizQuestionsInfoSkeleton } from '@/widgets/interview/QuizzesStatistic';

import { QuizAdditionalInfoSkeleton } from '../QuizAdditionalInfo/QuizAdditionalInfo.skeleton';

import styles from './InterviewQuizResultPage.module.css';

export const InterviewQuizResultPageSkeleton = () => {
	return (
		<Flex gap="20" wrap="wrap" className={styles.container}>
			<QuizQuestionsInfoSkeleton className={styles.questions} />
			<QuizAdditionalInfoSkeleton className={styles.quiz} />
			<PassedQuestionsListSkeleton className={styles['questions-list']} questions={[]} />
		</Flex>
	);
};
