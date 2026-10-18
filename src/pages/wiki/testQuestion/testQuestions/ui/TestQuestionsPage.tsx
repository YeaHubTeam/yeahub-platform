import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { TestQuestionsList } from '@/widgets/testQuestionsList';

import styles from './TestQuestionsPage.module.css';

const TEST_QUESTIONS_LIMIT = 10;

export const TestQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const { isMobileS } = useScreenSize();

	const [page, setPage] = useState(1);

	const {
		data: testQuestions,
		isLoading,
		isError,
		refetch,
	} = useGetTestQuestionsListQuery({
		page,
		limit: TEST_QUESTIONS_LIMIT,
	});

	const testQuestionsList = testQuestions?.data ?? [];

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Translation.STUB_EMPTY_TITLE),
			subtitle: t(Translation.STUB_EMPTY_SUBTITLE),
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={testQuestionsList.length > 0}
			stubs={stubs}
			content={<TestQuestionsList testQuestions={testQuestionsList} />}
			paginationOptions={{
				page: testQuestions?.page ?? page,
				onChangePage: setPage,
				limit: testQuestions?.limit ?? TEST_QUESTIONS_LIMIT,
				total: testQuestions?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex gap="20" align="start">
					<Card className={styles.main}>
						<div className={styles['questions-list-header']}>
							<Text variant={isMobileS ? 'body5-accent' : 'body6'} isMainTitle maxRows={1}>
								{t(Translation.TEST_QUESTIONS_LIST_TITLE)}
							</Text>
						</div>

						<hr className={styles.divider} />

						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TestQuestionsPage;
