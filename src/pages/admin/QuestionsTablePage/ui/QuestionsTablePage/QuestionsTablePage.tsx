import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetQuestionsListQuery } from '@/entities/question';

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
	const { data: questions } = useGetQuestionsListQuery({ page, title: search });

	const onSelectQuestions = (ids: number[]) => {
		dispatch(questionsTablePageActions.setSelectedQuestions(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(questionsTablePageActions.setSearch(value));
	};

	const onRemoveQuestions = () => {
		//TODO implement removing selected questions
	};

	const [windowWidth, setWindowWidth] = useState(window.innerWidth < 907);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth < 907);

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const showRemoveButton = (windowWidth && selectedQuestions.length > 0) || !windowWidth;

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<SearchSection
					to="create"
					showRemoveButton={showRemoveButton}
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
