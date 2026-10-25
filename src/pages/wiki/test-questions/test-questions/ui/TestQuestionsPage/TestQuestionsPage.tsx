import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { i18Namespace, TestQuestions } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { useGetTestQuestionsPublicListQuery } from '@/entities/testQuestion';

import { useTestQuestionQueryNavigate } from '@/features/testQuestion/navigateTestQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { FullTestQuestionsList } from '@/widgets/testing/TestQuestionsList';

import styles from './TestQuestionsPage.module.css';
import { TestQuestionsPageSkeleton } from './TestQuestionsPage.skeleton';

const TestQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const { isMobileS } = useScreenSize();

	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = Number(searchParams.get('page')) || 1;

	const specializationId = useAppSelector(getSpecializationId);
	const { handleNavigation } = useTestQuestionQueryNavigate();

	const {
		data: allQuestions,
		isLoading: isLoadingAllQuestions,
		isError: isErrorAllQuestions,
		refetch: refetchAllQuestions,
	} = useGetTestQuestionsPublicListQuery({
		page: currentPage,
		specializationId,
	});

	const questions = allQuestions;
	const questionsList = questions?.data || [];

	const onMoveQuestionDetail = (id: number) => {
		handleNavigation(id);
	};

	const onChangePage = (n: number) => {
		setSearchParams((searchParams) => {
			searchParams.set('page', `${n}`);

			return searchParams;
		});
	};

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(TestQuestions.STUB_EMPTY_TEST_QUESTIONS_PUBLIC_TITLE),
			subtitle: t(TestQuestions.STUB_EMPTY_TEST_QUESTIONS_PUBLIC_SUBTITLE),
		},
		error: {
			onClick: refetchAllQuestions,
		},
	};

	useEffect(() => {
		if (!searchParams.has('page')) {
			setSearchParams(
				(prev) => {
					prev.set('page', '1');
					return prev;
				},
				{
					replace: true,
				},
			);
		}
	}, [searchParams, setSearchParams]);

	return (
		<PageWrapper
			isLoading={isLoadingAllQuestions}
			hasError={isErrorAllQuestions}
			skeleton={<TestQuestionsPageSkeleton />}
			hasData={questionsList.length > 0}
			stubs={stubs}
			content={
				<FullTestQuestionsList
					testQuestions={questionsList}
					onMoveQuestionDetail={onMoveQuestionDetail}
				/>
			}
			paginationOptions={{
				page: currentPage || 1,
				onChangePage,
				limit: questions?.limit || 0,
				total: questions?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex gap="20" align="start">
					<Card className={styles.main}>
						<div className={styles['questions-list-header']}>
							<Text variant={isMobileS ? 'body5-accent' : 'body6'} isMainTitle maxRows={1}>
								{t(TestQuestions.TITLE_SHORT)}
							</Text>
						</div>
						<hr className={styles.divider} />
						<>
							{content}
							{pagination}
						</>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TestQuestionsPage;
