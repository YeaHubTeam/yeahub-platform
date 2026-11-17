import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
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
		name: filters.name,
		specializations: filters.specialization,
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
			title: 'Похоже здесь пока нет тестовых вопросов',
			subtitle: 'Создайте первый тестовый вопрос - и начните добавлять материалы в базу знаний',
			buttonText: 'Добавить',
			onClick: () => navigate(ROUTES.admin.testQuestions.create.page),
		},
		'filter-empty': {
			title: 'К сожалению, по запросу не были найдены тестовые вопросы',
			subtitle: 'Попробуйте изменить параметры запроса или сбросьте все фильтры',
			buttonText: 'Сбросить фильтр',
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
