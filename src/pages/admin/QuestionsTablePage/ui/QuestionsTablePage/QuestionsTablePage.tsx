import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

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
	const search = useSelector(getQuestionsSearch);
	const selectedQuestions = useSelector(getSelectedQuestions);

	const { filter, handleFilterChange, resetFilters: resetQueryFilters } = useQueryFilter();

	const { data: questions, isFetching } = useGetQuestionsListQuery({
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
		dispatch(questionsTablePageActions.setSearch(''));
		dispatch(questionsTablePageActions.setSelectedQuestions([]));
		dispatch(questionsTablePageActions.setPage(1));
		resetQueryFilters();
	};

	const rows = questions?.data ?? [];
	const isEmpty = !isFetching && rows.length === 0;

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
					emptySlot={isEmpty ? <EmptyStub text={search} resetFilters={resetAll} /> : undefined}
				/>
				<QuestionPagePagination
					questionsResponse={questions}
					currentPage={filter.page || 1}
					onPageChange={onPageChange}
				/>
			</Card>
		</Flex>
	);
};

export default QuestionsPage;
