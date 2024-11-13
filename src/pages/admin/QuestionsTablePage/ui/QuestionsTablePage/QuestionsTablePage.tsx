import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetQuestionsListQuery } from '@/entities/question';

import { DeleteQuestionsButton } from '@/features/question/deleteQuestions';

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

	const { filter, handleFilterChange } = useQueryFilter();

	const { data: questions } = useGetQuestionsListQuery({
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

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedQuestions.length > 0}
				onSearch={onChangeSearch}
				renderAction={() => <DeleteQuestionsButton questionsToRemove={selectedQuestions} />}
			/>
			<Card className={styles.content}>
				<QuestionsTable
					questions={questions?.data}
					selectedQuestions={selectedQuestions}
					onSelectQuestions={onSelectQuestions}
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
