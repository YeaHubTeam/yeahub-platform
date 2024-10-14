// import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

// import { useGetQuestionsListQuery } from '@/entities/question';

import { QuestionsTable } from '@/widgets/QuestionsTable';
import { SearchSection } from '@/widgets/SearchSection';

// import {
// 	getQuestionsPageNum,
// 	getQuestionsSearch,
// 	getSelectedQuestions,
// } from '../../model/selectors/questionsPageSelectors';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
import { QuestionPagePagination } from '../QuestionPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';

/**
 * Page showing info about all the created questions
 * @constructor
 */

const QuestionsPage = () => {
	const dispatch = useAppDispatch();
	// const page = useSelector(getQuestionsPageNum);
	// const search = useSelector(getQuestionsSearch);
	// const selectedQuestions = useSelector(getSelectedQuestions);
	// const { data: questions } = useGetQuestionsListQuery({ page, title: search });

	const onSelectQuestions = (ids: string[]) => {
		dispatch(questionsPageActions.setSelectedQuestions(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(questionsPageActions.setSearch(value));
	};

	const onRemoveQuestions = () => {
		//TODO implement removing selected questions
		// console.log('onRemoveQuestions: ', selectedQuestions);
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<SearchSection
					// className={styles['search-section']}
					to="create"
					// showRemoveButton={selectedQuestions.length > 0}
					onRemove={onRemoveQuestions}
					onSearch={onChangeSearch}
				/>
				<QuestionsTable
					// questions={questions?.data}
					// selectedQuestions={selectedQuestions}
					onSelectQuestions={onSelectQuestions}
				/>
				<QuestionPagePagination />
				{/* <QuestionPagePagination questionsResponse={questions} /> */}
			</Card>
		</Flex>
	);
};

export default QuestionsPage;
