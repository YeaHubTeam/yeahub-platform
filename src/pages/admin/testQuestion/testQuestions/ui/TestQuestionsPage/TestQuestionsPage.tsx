import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import {
	TestQuestionsFilters,
	useTestQuestionsFilters,
} from '@/features/testQuestion/filterTestQuestions';

import { PageWrapper } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { TestQuestionsTable } from '../TestQuestionsTable/TestQuestionsTable';

export const TestQuestionsPage = () => {
	const userId = useAppSelector(getUserId);
	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeIsMy,
		onChangeAuthorId,
		onChangeSpecialization,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
	} = useTestQuestionsFilters({ page: 1 });
	const isWaitingForUser = Boolean(filters.isMy && !userId);

	const { data, isLoading, isError } = useGetTestQuestionsListQuery(
		{
			page: filters.page,
			limit: 10,
			order: 'ASC',
			authorId: filters.isMy ? userId : filters.authorId,
			specializationId: filters.specialization,
			skills: filters.skills,
			complexity: filters.complexity,
			rate: filters.rate,
		},
		{ skip: isWaitingForUser },
	);

	return (
		<PageWrapper
			isLoading={isLoading || isWaitingForUser}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={Boolean(data?.data.length)}
			stubs={{
				'filter-empty': { onClick: onResetFilters },
			}}
			content={<TestQuestionsTable testQuestions={data?.data ?? []} />}
			paginationOptions={{
				page: filters.page || 1,
				limit: data?.limit ?? 10,
				total: data?.total ?? 0,
				onChangePage,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						hasFilters={hasFilters}
						onResetFilters={onResetFilters}
						showResetFilterButton={hasFilters}
						renderFilter={() => (
							<TestQuestionsFilters
								filters={filters}
								onChangeIsMy={onChangeIsMy}
								onChangeAuthorId={onChangeAuthorId}
								onChangeSpecialization={onChangeSpecialization}
								onChangeSkills={onChangeSkills}
								onChangeComplexity={onChangeComplexity}
								onChangeRate={onChangeRate}
							/>
						)}
					/>
					<Card>
						<Flex direction="column" gap="24">
							{content}
							{pagination}
						</Flex>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TestQuestionsPage;
