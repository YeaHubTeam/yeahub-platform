import { useMemo } from 'react';

import { useAppDispatch, useAppSelector, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { DeleteQuestionsButton } from '@/features/question/deleteQuestions';
import { QuestionsFilterSet } from '@/features/question/questionsFilterSet';

import { QuestionsTable } from '@/widgets/QuestionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getQuestionsSearch,
	getSelectedQuestions,
} from '../../model/selectors/questionsTablePageSelectors';
import { questionsTablePageActions } from '../../model/slices/questionsTablePageSlice';
import { QuestionPagePagination } from '../QuestionTablePagePagination/QuestionTablePagePagination';

import styles from './QuestionsTablePage.module.css';

/**
 * Page showing info about all the created questions
 * @constructor
 */

const QuestionsPage = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(getUserId);
	const search = useAppSelector(getQuestionsSearch);
	const selectedQuestions = useAppSelector(getSelectedQuestions);
	const isAuthor = useAppSelector(getIsAuthor);

	const { filter, handleFilterChange, resetFilters: resetQueryFilters } = useQueryFilter();

	const { data: allQuestions, isFetching } = useGetQuestionsListQuery({
		...filter,
		title: search,
	});

	const onSelectQuestions = (ids: SelectedAdminEntities) => {
		dispatch(questionsTablePageActions.setSelectedQuestions(ids));
	};

	const onChangeSearch = (value: string) => {
		dispatch(questionsTablePageActions.setSearch(value));
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
		dispatch(questionsTablePageActions.setPage(page));
	};

	const resetAll = () => {
		dispatch(questionsTablePageActions.resetFilters());
		resetQueryFilters();
	};

	const rows = allQuestions?.data ?? [];
	const isEmpty = !isFetching && rows.length === 0;

	const questions = useMemo(() => {
		if (!allQuestions || !allQuestions.data) return undefined;

		return {
			...allQuestions,
			data: allQuestions.data.map((item) => ({
				...item,
				disabled: isAuthor && item.createdBy?.id !== userId,
			})),
		};
	}, [allQuestions, userId]);

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedQuestions.length > 0}
				onSearch={onChangeSearch}
				renderRemoveButton={() => <DeleteQuestionsButton questionsToRemove={selectedQuestions} />}
				renderFilter={() => <QuestionsFilterSet />}
			/>
			<Card className={styles.content}>
				<QuestionsTable
					questions={questions?.data}
					selectedQuestions={selectedQuestions}
					onSelectQuestions={onSelectQuestions}
				/>

				{isEmpty && <EmptyStub text={search} resetFilters={resetAll} />}

				{!isEmpty && (
					<QuestionPagePagination
						questionsResponse={questions}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}
			</Card>
		</Flex>
	);
};

export default QuestionsPage;
