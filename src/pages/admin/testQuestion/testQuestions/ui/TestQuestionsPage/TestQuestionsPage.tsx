import { useSearchParams } from 'react-router-dom';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import { PageWrapper } from '@/widgets/PageWrapper';

import { TestQuestionsTable } from '../TestQuestionsTable/TestQuestionsTable';

export const TestQuestionsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageParam = Number(searchParams.get('page') ?? 1);
	const page = Number.isSafeInteger(pageParam) && pageParam > 0 ? pageParam : 1;

	const onChangePage = (nextPage: number) => {
		setSearchParams((prevParams) => {
			const nextParams = new URLSearchParams(prevParams);
			nextParams.set('page', String(nextPage));
			return nextParams;
		});
	};

	const { data, isLoading, isError } = useGetTestQuestionsListQuery({
		page: page,
		limit: 10,
		order: 'ASC',
	});

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={Boolean(data?.data.length)}
			stubs={{}}
			content={<TestQuestionsTable testQuestions={data?.data ?? []} />}
			paginationOptions={{
				page,
				limit: data?.limit ?? 10,
				total: data?.total ?? 0,
				onChangePage,
			}}
		>
			{({ content, pagination }) => (
				<Card>
					<Flex direction="column" gap="24">
						{content}
						{pagination}
					</Flex>
				</Card>
			)}
		</PageWrapper>
	);
};

export default TestQuestionsPage;
