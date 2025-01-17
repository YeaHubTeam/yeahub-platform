import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, TextArea, Input, Label, Radio, Icon, Chip } from 'yeahub-ui-kit';

import PlusSvg from '@/shared/assets/icons/Plus.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetQuestionsListQuery } from '@/entities/question';

import styles from './CollectionForm.module.css';

export interface CollectionFormProps {
	imageSrc?: string | null;
	isEdit?: boolean;
}

export const CollectionForm = ({ isEdit, imageSrc }: CollectionFormProps) => {
	const { t } = useTranslation([i18Namespace.collection]);
	const { control, setValue, watch } = useFormContext();

	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);

	const watchPaidOrFree = watch('paidOrFree', '');

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('imageSrc', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('imageSrc', null);
	};

	const [collectionSearch, setCollectionSearch] = useState('');
	const [selectedQuestions, setSelectedQuestions] = useState<{ title: string; id: number }[]>([]);

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
		<>
			<Text
				title={isEdit ? t(Collections.EDIT_PAGE_TITLE) : t(Collections.CREATE_PAGE_TITLE)}
				className={styles['main-title']}
			/>
			<Flex direction="column" gap="60">
				<Flex className={`${styles['collection-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text title={t(Collections.TITLE_FULL)} className={styles.title} />
						<Text title={t(Collections.TITLE_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
				<Flex direction="column" gap="8">
					<Text title={t(Collections.DESCRIPTION_FULL)} className={styles.title} />
					<Text title={t(Collections.DESCRIPTION_LABEL)} className={styles.description} />
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Collections.DESCRIPTION_PLACEHOLDER)}
								state={hasError ? 'error' : 'default'}
								{...field}
							/>
						)}
					</FormControl>
				</Flex>
				<Flex gap="120">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.ICON_TITLE)} className={styles.title} />
						<Text title={t(Collections.ICON_LABEL)} className={styles.description} />
					</Flex>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>
				<Flex gap="120" align="center">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.SELECT_CHOOSE)} className={styles.title} />
						<Text title={t(Collections.SELECT_LABEL)} className={styles.description} />
					</Flex>
					<Flex gap="60">
						<Label className={styles['paid-label']}>
							<Radio
								checked={watchPaidOrFree === 'paid'}
								onChange={() => setValue('paidOrFree', 'paid')}
							/>
							{t(Collections.SELECT_PAID)}
						</Label>
						<Label className={styles['paid-label']}>
							<Radio
								checked={watchPaidOrFree === 'free'}
								onChange={() => setValue('paidOrFree', 'free')}
							/>
							{t(Collections.SELECT_FREE)}
						</Label>
					</Flex>
				</Flex>
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
							<Drawer
								isOpen={isOpen}
								onClose={onClose}
								rootName="body"
								className={styles['drawer']}
							>
								<Flex direction="column" gap="16" className={styles['drawer-content']}>
									<Input
										onChange={handleCollectionSearch}
										className={styles.input}
										preffix={<Icon icon={'search'} className={styles['search-svg']} />}
										placeholder={t(Translation.SEARCH)}
									/>
									<Flex direction="column" gap="16">
										{filteredQuestions?.map((question) => (
											<button
												key={question.id}
												onClick={() =>
													handleSelectQuestion({ title: question.title, id: question.id })
												}
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
			</Flex>
		</>
	);
};
