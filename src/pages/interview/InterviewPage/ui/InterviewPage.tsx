import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';

import { getIsEmptySpecialization, getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import {
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useGetProfileQuizStatsQuery,
} from '@/entities/quiz';

import { InterviewPreparation } from '@/widgets/interview/InterviewPreparation';
import { PreviewPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { PreviewQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { PreviewQuestionsList } from '@/widgets/question/QuestionsList';

import styles from './InterviewPage.module.css';
import { InterviewPageSkeleton } from './InterviewPage.skeleton';

const InterviewPage = () => {
	const profileId = useAppSelector(getProfileId);
	const specializationId = useAppSelector(getSpecializationId);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	const { isLoading: isProfileStatsLoading } = useGetProfileQuizStatsQuery(profileId);

	const { isLoading: isHistoryLoading } = useGetHistoryQuizQuery({
		profileId,
		limit: 3,
		uniqueKey: 'interviewPreviewHistory',
	});

	const { isLoading: isQuestionsListLoading } = useGetQuestionsListQuery({
		random: true,
		limit: 3,
		specialization: specializationId,
	});

	const { isLoading: isActiveQuizLoading } = useGetActiveQuizQuery({
		profileId,
		limit: 1,
		page: 1,
	});

	if (isProfileStatsLoading || isActiveQuizLoading || isHistoryLoading || isQuestionsListLoading) {
		return <InterviewPageSkeleton />;
	}

	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<InterviewPreparation className={styles.interview} />
			{!isSpecializationEmpty && (
				<>
					<PreviewQuestionsStatistic className={styles.statistics} />
					<PreviewQuestionsList className={styles.questions} />
					<PreviewPassedQuizzesList className={styles.history} />
				</>
			)}
		</Flex>
	);
};

export default InterviewPage;
