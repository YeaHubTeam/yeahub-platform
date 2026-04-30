import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Input } from '@/shared/ui/Input';
import { KeywordInput } from '@/shared/ui/KeywordInput';
import { KeywordSelect } from '@/shared/ui/KeywordSelect';
import { Radio } from '@/shared/ui/Radio';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { CompanySelect } from '@/entities/company/@x/collection';
import { ChooseQuestionsDrawer } from '@/entities/question/@x/collection';
import { SpecializationSelect } from '@/entities/specialization/@x/collection';
import { ChooseTasksDrawer } from '@/entities/task/@x/collection';

import { useGetCollectionKeywordsQuery } from '../../api/collectionApi';

import styles from './CollectionForm.module.css';
import { useCollectionImage } from './hooks/useCollectionImage';
import { useCollectionQuestions } from './hooks/useCollectionQuestions';
import { useCollectionTasks } from './hooks/useCollectionTasks';

export interface CollectionFormProps {
	isEdit?: boolean;
	questionsCount?: number;
	tasksCount?: number;
}

export const CollectionForm = ({ isEdit, questionsCount, tasksCount }: CollectionFormProps) => {
	const { t } = useTranslation([i18Namespace.collection]);
	const { control, watch, setValue } = useFormContext();

	const collectionId = watch('id');
	const isFree = watch('isFree', true);
	const specializations = watch('specializations');

	const { previewImg, changeImage, removeImage } = useCollectionImage();

	const { selectedQuestions, handleSelectQuestion, handleUnselectQuestion } =
		useCollectionQuestions(collectionId, questionsCount);

	const { selectedTasks, handleSelectTask, handleUnselectTask } = useCollectionTasks(
		collectionId,
		tasksCount,
		isEdit,
	);

	return (
		<>
			<Text variant="body5-strong">
				{isEdit ? t(Collections.EDIT_PAGE_TITLE) : t(Collections.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormField
					label={t(Collections.TITLE_FULL)}
					description={t(Collections.TITLE_LABEL)}
					direction="row"
				>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} />}
					</FormControl>
				</FormField>

				<FormField
					label={t(Collections.COMPANY_TITLE)}
					description={t(Collections.COMPANY_LABEL)}
					direction="row"
				>
					<FormControl name="companyId" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<CompanySelect onChange={onChange} value={value} />
							</div>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(Collections.DESCRIPTION_FULL)}
					description={t(Collections.DESCRIPTION_LABEL)}
					direction="column"
				>
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
				</FormField>

				<FormField
					label={t(Collections.ICON_TITLE)}
					description={t(Collections.ICON_LABEL)}
					direction="row"
				>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</FormField>

				<FormField
					label={t(Collections.TARIFF_CHOOSE)}
					description={t(Collections.TARIFF_LABEL)}
					direction="row"
				>
					<Flex gap="60">
						<Radio
							label={t(Collections.TARIFF_PAID)}
							labelClassName={styles['paid-label']}
							checked={!isFree}
							onChange={() => setValue('isFree', false)}
						/>
						<Radio
							label={t(Collections.TARIFF_FREE)}
							labelClassName={styles['paid-label']}
							checked={isFree}
							onChange={() => setValue('isFree', true)}
						/>
					</Flex>
				</FormField>

				<FormField
					label={t(Collections.SPECIALIZATION_TITLE)}
					description={t(Collections.SPECIALIZATION_LABEL)}
					direction="row"
				>
					<FormControl name="specializations" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<SpecializationSelect onChange={onChange} value={value} hasMultiple={false} />
							</div>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(Collections.KEYWORDS_TITLE)}
					description={t(Collections.KEYWORDS_LABEL)}
					direction="row"
				>
					<FormControl name="keywords" control={control}>
						{({ onChange, value }) => {
							const currentKeywords = Array.isArray(value) ? value : [];

							return (
								<div className={styles.select}>
									<Flex direction="column" gap="32">
										<KeywordSelect
											getKeywordsQuery={useGetCollectionKeywordsQuery}
											value={undefined}
											onChange={(keyword) => {
												if (keyword && !currentKeywords.includes(keyword)) {
													onChange([...currentKeywords, keyword]);
												}
											}}
											selectedKeywords={currentKeywords}
											showLabel={false}
											showSelected={false}
											width={360}
											label={t(Collections.ADDITIONAL_INFO_ACCESS)}
										/>
										<KeywordInput value={currentKeywords} onChange={onChange} />
									</Flex>
								</div>
							);
						}}
					</FormControl>
				</FormField>

				<FormControl name="questions" control={control}>
					{() => (
						<ChooseQuestionsDrawer
							selectedQuestions={selectedQuestions}
							handleSelectQuestion={handleSelectQuestion}
							handleUnselectQuestion={handleUnselectQuestion}
							specializations={specializations}
						/>
					)}
				</FormControl>

				<FormControl name="taskIds" control={control}>
					{() => (
						<ChooseTasksDrawer
							selectedTasks={selectedTasks}
							handleSelectTask={handleSelectTask}
							handleUnselectTask={handleUnselectTask}
						/>
					)}
				</FormControl>
			</Flex>
		</>
	);
};
