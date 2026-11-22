import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, TestQuestions } from '@/shared/config';
import { SelectedAdminEntities, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import {
	TestQuestionsFilters,
	useTestQuestionsFilters,
} from '@/features/testQuestion/filterTestQuestions';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { TestQuestionsTable } from '../TestQuestionsTable/TestQuestionsTable';

const TestQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.testQuestions);
	const navigate = useNavigate();
	const userId = useAppSelector(getUserId);
	const [selectedTestQuestions, setSelectedTestQuestions] = useState<SelectedAdminEntities>([]);

	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangeName,
		onChangePage,
		onChangeSpecialization,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
		onChangeIsMy,
		onChangeAuthorId,
	} = useTestQuestionsFilters({
		page: 1,
	});

	const {
		data: testQuestionsData,
		isLoading,
		isError,
		refetch,
	} = useGetTestQuestionsListQuery({
		page: filters.page,
		limit: 10,
		title: filters.name,
		specializationId: filters.specialization,
		skills: filters.skills,
		complexity: filters.complexity,
		rate: filters.rate,
		authorId: filters.isMy ? userId : filters.authorId,
	});

	const testQuestions = testQuestionsData?.data ?? [];
	const hasTestQuestions = testQuestions.length > 0;

	const content = hasTestQuestions ? (
		<TestQuestionsTable
			testQuestions={testQuestions}
			selectedTestQuestions={selectedTestQuestions}
			onSelectTestQuestions={setSelectedTestQuestions}
		/>
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(TestQuestions.STUB_EMPTY_TITLE),
			subtitle: t(TestQuestions.STUB_EMPTY_SUBTITLE),
			buttonText: t(TestQuestions.STUB_EMPTY_SUBMIT),
			onClick: () => navigate(ROUTES.admin.testQuestions.create.page),
		},
		'filter-empty': {
			title: t(TestQuestions.STUB_FILTER_TITLE),
			subtitle: t(TestQuestions.STUB_FILTER_SUBTITLE),
			buttonText: t(TestQuestions.STUB_FILTER_SUBMIT),
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTestQuestions}
			hasFilters={hasFilters}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: 10,
				total: testQuestionsData?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to={ROUTES.admin.testQuestions.create.page}
						onSearch={onChangeName}
						searchValue={filters.name}
						hasFilters={hasFilters}
						showResetFilterButton={hasFilters}
						onResetFilters={onResetFilters}
						renderFilter={() => (
							<TestQuestionsFilters
								filters={filters}
								onChangeSpecialization={onChangeSpecialization}
								onChangeSkills={onChangeSkills}
								onChangeComplexity={onChangeComplexity}
								onChangeRate={onChangeRate}
								onChangeIsMy={onChangeIsMy}
								onChangeAuthorId={onChangeAuthorId}
							/>
						)}
					/>
					<Card>
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TestQuestionsPage;
