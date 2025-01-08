import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, Icon, Chip } from 'yeahub-ui-kit';

import PlusSvg from '@/shared/assets/icons/Plus.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetQuestionsListQuery } from '@/entities/question';

import styles from './CollectionForm.module.css';

export const CollectionForm = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const [collectionSearch, setCollectionSearch] = useState('');
	const [selectedQuestions, setSelectedQuestions] = useState<{ title: string; id: number }[]>([]);

	const { setValue } = useFormContext();
	const { isOpen, onToggle, onClose } = useModal();

	const questions = useGetQuestionsListQuery({ title: collectionSearch, limit: 10 });

	const handleCollectionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCollectionSearch(e.target.value);
	};

	const handleSelectQuestion = (question: { title: string; id: number }) => {
		setSelectedQuestions((prev) => [...prev, question]);
		setValue('questions', selectedQuestionsIds);
	};

	const handleUnselectQuestion = (id: number) => {
		setSelectedQuestions((prev) => prev.filter((item) => item.id !== id));
		setValue('questions', selectedQuestionsIds);
	};

	const filteredQuestions = questions.data?.data.filter(
		(question) => !selectedQuestions.some((selected) => selected.id === question.id),
	);

	const selectedQuestionsIds = selectedQuestions.map((question) => question.id);

	return (
		<div className={styles.form}>
			<Flex direction="column" gap="60">
				<Flex gap="24" direction="column">
					<Flex gap="24">
						<Flex className={styles['text-wrapper']} direction="column" gap="8">
							<Text title={'Вопросы'} className={styles.title} />
							<Text title={'Добавьте вопросы'} className={styles.description} />
						</Flex>
						<Flex direction="column" gap="24" className={styles['selected-questions']}>
							<Text
								title={`Выбранные вопросы: ${selectedQuestions.length}`}
								className={styles['selected-questions-title']}
							></Text>
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
					<Button onClick={onToggle} className={styles.button}>
						{t(Translation.CREATE)}
						<PlusSvg className={styles['plus-svg']} />
					</Button>
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
									>
										<Card withOutsideShadow className={styles['question-card']}>
											{question.title}
										</Card>
									</button>
								))}
							</Flex>
						</Flex>
					</Drawer>
				</Flex>
			</Flex>
		</div>
	);
};
