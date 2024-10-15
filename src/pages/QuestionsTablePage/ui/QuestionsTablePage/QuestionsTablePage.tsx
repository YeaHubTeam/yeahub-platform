import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetAdminQuestionsListQuery } from '@/entities/question';

import { QuestionsTable } from '@/widgets/QuestionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getQuestionsPageNum,
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
	const page = useSelector(getQuestionsPageNum);
	const search = useSelector(getQuestionsSearch);
	const selectedQuestions = useSelector(getSelectedQuestions);
	const { data: questions } = useGetAdminQuestionsListQuery({ page, title: search });

	const onSelectQuestions = (ids: string[]) => {
		dispatch(questionsTablePageActions.setSelectedQuestions(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(questionsTablePageActions.setSearch(value));
	};

	const onRemoveQuestions = () => {
		//TODO implement removing selected questions
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<SearchSection
					to="create"
					showRemoveButton={selectedQuestions.length > 0}
					onRemove={onRemoveQuestions}
					onSearch={onChangeSearch}
				/>
				<QuestionsTable
					questions={questions?.data}
					selectedQuestions={selectedQuestions}
					onSelectQuestions={onSelectQuestions}
				/>
				<QuestionPagePagination questionsResponse={questions} />
			</Card>
		</Flex>
	);
};

export default QuestionsPage;
