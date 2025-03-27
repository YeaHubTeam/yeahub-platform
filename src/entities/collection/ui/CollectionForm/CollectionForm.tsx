import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, TextArea, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { KeywordInput } from '@/shared/ui/KeywordInput/KeywordInput';
import { Radio } from '@/shared/ui/Radio';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ChooseQuestionsDrawer } from '@/entities/question';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import styles from './CollectionForm.module.css';

export interface CollectionFormProps {
	imageSrc?: string | null;
	isEdit?: boolean;
}

export const CollectionForm = ({ isEdit, imageSrc }: CollectionFormProps) => {
	const { t } = useTranslation([i18Namespace.collection]);
	const { control, setValue, watch } = useFormContext();

	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);
	const [selectedQuestions, setSelectedQuestions] = useState<{ title: string; id: number }[]>([]);

	const watchPaidOrFree = watch('paidOrFree', '');
	const watchQuestions = watch('questions', []);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('imageSrc', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('imageSrc', null);
	};

	const handleSelectQuestion = (question: { title: string; id: number }) => {
		setSelectedQuestions((prev) => [...prev, question]);
		setValue('questions', [...watchQuestions, question.id]);
	};

	const handleUnselectQuestion = (id: number) => {
		setSelectedQuestions((prev) => prev.filter((item) => item.id !== id));
		setValue(
			'questions',
			watchQuestions.filter((questionId: number) => questionId !== id),
		);
	};

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
						<Text title={t(Collections.TARIFF_CHOOSE)} className={styles.title} />
						<Text title={t(Collections.TARIFF_LABEL)} className={styles.description} />
					</Flex>
					<Flex gap="60">
						<Radio
							label={t(Collections.TARIFF_PAID)}
							labelClassName={styles['paid-label']}
							checked={watchPaidOrFree === 'paid'}
							onChange={() => setValue('paidOrFree', 'paid')}
						/>
						<Radio
							label={t(Collections.TARIFF_FREE)}
							labelClassName={styles['paid-label']}
							checked={watchPaidOrFree === 'free'}
							onChange={() => setValue('paidOrFree', 'free')}
						/>
					</Flex>
				</Flex>
				<Flex gap={'120'}>
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.SPECIALIZATION_TITLE)} className={styles.title} />
						<Text text={t(Collections.SPECIALIZATION_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="specializations" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<SpecializationSelect onChange={onChange} value={value} hasMultiple />
							</div>
						)}
					</FormControl>
				</Flex>
				<Flex gap={'120'}>
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.KEYWORDS_TITLE)} className={styles.title} />
						<Text text={t(Collections.KEYWORDS_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="keywordsCollection" control={control}>
						{({ onChange, value }) => {
							return (
								<div className={styles.select}>
									<KeywordInput value={value} onChange={onChange} />
								</div>
							);
						}}
					</FormControl>
				</Flex>
				<ChooseQuestionsDrawer
					selectedQuestions={selectedQuestions}
					handleSelectQuestion={handleSelectQuestion}
					handleUnselectQuestion={handleUnselectQuestion}
				/>
			</Flex>
		</>
	);
};
