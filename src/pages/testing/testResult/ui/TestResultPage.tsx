import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { AttemptInfo, PercentsInfoPie } from '@/shared/ui/PercentsInfoPie';

import { getHasPremiumAccess, getIsVerified, getProfileId } from '@/entities/profile';
import { useGetFinishedTestDataQuery } from '@/entities/test';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { TestResultAdditionalInfo } from './TestResultAdditionalInfo/TestResultAdditionalInfo';
import styles from './TestResultPage.module.css';
import { TestResultPageSkeleton } from './TestResultPage.skeleton';
import { TestResultQuestionsList } from './TestResultQuestionsList/TestResultQuestionsList';

const TestResultPage = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = useAppSelector(getIsVerified);

	const profileId = useAppSelector(getProfileId);
	const { testId = '' } = useParams<{ testId?: string }>();

	const {
		data: test,
		isLoading,
		isError,
		refetch,
	} = useGetFinishedTestDataQuery(
		{
			testId,
			profileId,
		},
		{ skip: !isVerified || !hasPremium },
	);
	const questions = test?.questions ?? [];
	const answers = test?.response.answers ?? [];
	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		empty: {
			title: t(InterviewQuizResult.STUB_EMPTY_TITLE),
			subtitle: t(InterviewQuizResult.STUB_EMPTY_SUBTITLE),
			buttonText: t(InterviewQuizResult.STUB_EMPTY_BUTTON),
			onClick: refetch,
		},
	};
	const fullCount = test?.fullCount ?? 0;
	const successCount = test?.successCount ?? 0;

	const correctPercent = fullCount > 0 ? Math.round((successCount / fullCount) * 100) : 0;
	const incorrectPercent = fullCount > 0 ? 100 - correctPercent : 0;

	const stats: AttemptInfo[] = [
		{
			name: 'Правильно',
			value: correctPercent,
			itemStyle: { color: '#008616' },
		},
		{
			name: 'Неправильно',
			value: incorrectPercent,
			itemStyle: { color: '#af0932' },
		},
	];
	return (
		<PageWrapper
			shouldVerify
			stubs={stubs}
			shouldPremium
			isLoading={isLoading}
			hasError={isError}
			skeleton={<TestResultPageSkeleton />}
			hasData={Boolean(questions?.length)}
			content={
				<Flex gap="20" wrap="wrap" className={styles.container} justify="end">
					<Flex gap="20" wrap="wrap" maxWidth>
						<PercentsInfoPie
							className={styles.questions}
							title={`Результат тестирования № ${test?.testNumber ?? ''}`}
							attemptStats={stats}
							totalAttempt={fullCount}
						/>
						<TestResultAdditionalInfo
							className={styles.test}
							fullCount={fullCount}
							successCount={successCount}
						/>
					</Flex>
					<Flex justify="start" maxWidth className={styles['questions-list']} direction="column">
						<TestResultQuestionsList
							questions={questions}
							answers={answers}
							fullCount={fullCount}
						/>
					</Flex>
				</Flex>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
export default TestResultPage;
