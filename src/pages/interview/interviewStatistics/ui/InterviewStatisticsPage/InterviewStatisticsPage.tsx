import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewStatistics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getIsVerified, getProfileId } from '@/entities/profile';
import { useGetProfileQuizStatsQuery } from '@/entities/quiz';

import { CategoryProgressList } from '@/widgets/interview/CategoryProgressList';
import { PreviewPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { FullQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { QuizzesStatistic } from '@/widgets/interview/QuizzesStatistic';
import { PageWrapper } from '@/widgets/PageWrapper';

import styles from './InterviewStatisticsPage.module.css';
import { InterviewStatisticsPageSkeleton } from './InterviewStatisticsPage.skeleton';

const InterviewStatisticsPage = () => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const profileId = useAppSelector(getProfileId);
	const isVerified = useAppSelector(getIsVerified);

	const {
		data: profileStats,
		isLoading,
		refetch,
		isError,
	} = useGetProfileQuizStatsQuery(profileId, {
		skip: !isVerified,
	});

	return (
		<PageWrapper
			shouldVerify
			isLoading={isLoading}
			skeleton={<InterviewStatisticsPageSkeleton />}
			stubs={{ error: { onClick: refetch } }}
			hasData
			hasError={isError}
			content={
				<Flex wrap="wrap" gap="20" className={styles.container}>
					<QuizzesStatistic quizzesStat={profileStats?.quizzesStat} className={styles.quizzes} />
					<FullQuestionsStatistic
						className={styles.questions}
						questionsStat={profileStats?.questionsStat}
					/>
					<PreviewPassedQuizzesList className={styles.history} />
					<CategoryProgressList
						className={styles.progress}
						skillsStat={profileStats?.skillsStat}
						title={t(InterviewStatistics.PROGRESS_TITLE)}
					/>
				</Flex>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default InterviewStatisticsPage;
