import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetQuestionsListQuery } from '../../api/questionApi';
import { QuestionData } from '../../model/types/question';

import styles from './QuestionsSearchList.module.css';

const COLLECTION_QUESTIONS_LIMIT = 10;

interface QuestionsSearchListProps {
	selectedQuestions: { id: number; title: string }[];
	handleSelectQuestion: (task: QuestionData) => void;
	handleUnselectQuestion: (id: number) => void;
	specializations?: number[];
}

export const QuestionsSearchList = ({
	selectedQuestions,
	handleSelectQuestion,
	handleUnselectQuestion,
	specializations,
}: QuestionsSearchListProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const [collectionSearch, setCollectionSearch] = useState('');
	const [page, setPage] = useState(1);

	const questions = useGetQuestionsListQuery({
		title: collectionSearch,
		limit: COLLECTION_QUESTIONS_LIMIT,
		page: page,
		specializationId: specializations?.length ? specializations : undefined,
	});

	const handleCollectionSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setCollectionSearch(e.target.value);
		setPage(1);
	};

	const handleQuestionClick = (question: { title: string; id: number }, isActive: boolean) => {
		if (isActive) {
			handleUnselectQuestion(question.id);
		} else {
			handleSelectQuestion(question);
		}
	};

	const questionsList = questions.data?.data || [];
	const totalQuestions = questions.data?.total || 0;

	return (
		<Flex direction="column" gap="24" className={styles['drawer-content']}>
			<Input
				onChange={handleCollectionSearch}
				className={styles.input}
				prefix={<Icon icon="search" size={20} color="black-300" />}
				placeholder={t(Translation.SEARCH)}
			/>
			<Flex direction="column" gap="16">
				{questionsList?.map((question) => {
					const isActive = selectedQuestions.some((selected) => selected.id === question.id);
					return (
						<button
							key={question.id}
							onClick={() =>
								handleQuestionClick({ title: question.title, id: question.id }, isActive)
							}
							className={styles['question-button']}
						>
							<Card
								withOutsideShadow
								className={`${styles['question-card']} ${isActive && styles['question-card-active']}`}
							>
								{question.title}
							</Card>
						</button>
					);
				})}
			</Flex>
			<TablePagination
				page={page}
				total={totalQuestions}
				limit={COLLECTION_QUESTIONS_LIMIT}
				onChangePage={setPage}
			/>
		</Flex>
	);
};
