import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { useGetProfileQuizStatsQuery } from '@/entities/quiz';

import { CategoryProgressList } from '@/widgets/interview/CategoryProgressList';
import { PreviewPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { FullQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { QuizzesStatistic } from '@/widgets/interview/QuizzesStatistic';

import styles from './InterviewStatisticsPage.module.css';
import { InterviewStatisticsPageSkeleton } from './InterviewStatisticsPage.skeleton';

const InterviewStatisticsPage = () => {
	const profileId = useAppSelector(getProfileId);
	const { data: profileStats, isLoading } = useGetProfileQuizStatsQuery(profileId);

	if (isLoading) {
		return <InterviewStatisticsPageSkeleton />;
	}

	return (
		<Flex wrap="wrap" gap="20" className={styles.container}>
			<QuizzesStatistic quizzesStat={profileStats?.quizzesStat} className={styles.quizzes} />
			<FullQuestionsStatistic
				className={styles.questions}
				questionsStat={profileStats?.questionsStat}
			/>
			<PreviewPassedQuizzesList className={styles.history} />
			<CategoryProgressList className={styles.progress} skillsStat={profileStats?.skillsStat} />
		</Flex>
	);
};

export default InterviewStatisticsPage;
