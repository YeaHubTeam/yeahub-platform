import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getIsEmptySpecialization, getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import { useGetActiveQuizQuery, useGetProfileQuizStatsQuery } from '@/entities/quiz';

import { InterviewPreparation } from '@/widgets/interview/InterviewPreparation';
import { PreviewPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { PreviewCollectionsList } from '@/widgets/interview/PreviewCollectionsList';
import { PreviewQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { PreviewQuestionsList } from '@/widgets/question/QuestionsList';

import styles from './InterviewPage.module.css';
import { InterviewPageSkeleton } from './InterviewPage.skeleton';

const InterviewPage = () => {
	const profileId = useAppSelector(getProfileId);
	const specializationId = useAppSelector(getSpecializationId);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	const { isLoading: isProfileStatsLoading } = useGetProfileQuizStatsQuery(profileId);

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

	if (isProfileStatsLoading || isActiveQuizLoading || isQuestionsListLoading) {
		return <InterviewPageSkeleton />;
	}

	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<InterviewPreparation className={styles.interview} />
			{!isSpecializationEmpty && (
				<>
					<PreviewQuestionsStatistic className={styles.statistics} />
					<Flex direction="column" gap="20" className={styles.list}>
						<PreviewQuestionsList />
						<PreviewPassedQuizzesList />
					</Flex>
					<PreviewCollectionsList className={styles.collections} />
				</>
			)}
		</Flex>
	);
};

export default InterviewPage;
