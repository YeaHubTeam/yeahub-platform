import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PlusSvg from '@/shared/assets/icons/plus1.svg';
import { i18Namespace, Collections, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { useGetQuestionsListQuery } from '../../api/questionApi';

import styles from './ChooseQuestionsDrawer.module.css';

const COLLECTION_QUESTIONS_LIMIT = 10;

interface ChooseQuestionsDrawerProps {
	selectedQuestions: { title: string; id: number }[];
	handleSelectQuestion: (question: { title: string; id: number }) => void;
	handleUnselectQuestion: (id: number) => void;
	specializations?: number[];
}

export const ChooseQuestionsDrawer = ({
	selectedQuestions,
	handleSelectQuestion,
	handleUnselectQuestion,
	specializations,
}: ChooseQuestionsDrawerProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const [collectionSearch, setCollectionSearch] = useState('');
	const [page, setPage] = useState(1);

	const { isOpen, onToggle, onClose } = useModal();

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
		<>
			<Flex className={selectedQuestions.length !== 0 ? styles.column : styles.row}>
				<Flex gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text variant="body4">
							{' '}
							{t(Collections.QUESTIONS_SHORT, { ns: i18Namespace.collection })}{' '}
						</Text>
						<Text variant="body2">
							{t(Collections.QUESTIONS_LABEL, { ns: i18Namespace.collection })}
						</Text>
					</Flex>
					<Flex direction="column" gap="24" className={styles['selected-questions']}>
						<Text variant="body3-accent">
							{' '}
							{t(Collections.QUESTIONS_SELECTED, {
								count: selectedQuestions.length,
								ns: i18Namespace.collection,
							})}
						</Text>
						<Flex direction="column" gap="16">
							{selectedQuestions.map((question) => (
								<Chip
									key={question.id}
									className={styles['chip']}
									theme="primary"
									label={question.title}
									onDelete={() => handleUnselectQuestion(question.id)}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
				<Button onClick={onToggle} className={styles['add-button']}>
					{t(Translation.CREATE)}
					<PlusSvg className={styles['plus-svg']} />
				</Button>
			</Flex>
			<Drawer isOpen={isOpen} onClose={onClose} rootName="body" className={styles['drawer']}>
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
			</Drawer>
		</>
	);
};
