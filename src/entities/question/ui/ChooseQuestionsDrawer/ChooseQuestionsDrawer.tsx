import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import PlusSvg from '@/shared/assets/icons/Plus.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

import { useGetQuestionsListQuery } from '../../api/questionApi';

import styles from './ChooseQuestionsDrawer.module.css';

interface ChooseQuestionsDrawerProps {
	selectedQuestions: { title: string; id: number }[];
	handleSelectQuestion: (question: { title: string; id: number }) => void;
	handleUnselectQuestion: (id: number) => void;
}

export const ChooseQuestionsDrawer = ({
	selectedQuestions,
	handleSelectQuestion,
	handleUnselectQuestion,
}: ChooseQuestionsDrawerProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const [collectionSearch, setCollectionSearch] = useState('');

	const { isOpen, onToggle, onClose } = useModal();

	const questions = useGetQuestionsListQuery({ title: collectionSearch, limit: 10 });

	const handleCollectionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCollectionSearch(e.target.value);
	};

	const filteredQuestions = questions.data?.data.filter(
		(question) => !selectedQuestions.some((selected) => selected.id === question.id),
	);

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
				<Flex direction="column" gap="16" className={styles['drawer-content']}>
					<Input
						onChange={handleCollectionSearch}
						className={styles.input}
						prefix={<Icon icon={'search'} className={styles['search-svg']} />}
						placeholder={t(Translation.SEARCH)}
					/>
					<Flex direction="column" gap="16">
						{filteredQuestions?.map((question) => (
							<button
								key={question.id}
								onClick={() => handleSelectQuestion({ title: question.title, id: question.id })}
								className={styles['question-button']}
							>
								<Card withOutsideShadow className={styles['question-card']}>
									{question.title}
								</Card>
							</button>
						))}
					</Flex>
				</Flex>
			</Drawer>
		</>
	);
};
