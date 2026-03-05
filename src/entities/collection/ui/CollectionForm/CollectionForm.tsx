import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
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
				<Flex className={`${styles['collection-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.TITLE_FULL)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.TITLE_LABEL)}
						</Text>
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} />}
					</FormControl>
				</Flex>

				<Flex gap="120">
					<Flex direction="column" className={styles['text-wrapper']} gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.COMPANY_TITLE)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.COMPANY_LABEL)}
						</Text>
					</Flex>
					<FormControl name="companyId" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<CompanySelect onChange={onChange} value={value} />
							</div>
						)}
					</FormControl>
				</Flex>

				<Flex direction="column" gap="8">
					<Text variant="body3-strong" color="black-800">
						{t(Collections.DESCRIPTION_FULL)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Collections.DESCRIPTION_LABEL)}
					</Text>
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
					<Flex direction="column" className={styles['text-wrapper']} gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.ICON_TITLE)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.ICON_LABEL)}
						</Text>
					</Flex>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>

				<Flex gap="120" align="center">
					<Flex direction="column" className={styles['text-wrapper']} gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.TARIFF_CHOOSE)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.TARIFF_LABEL)}
						</Text>
					</Flex>
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
				</Flex>

				<Flex gap="120">
					<Flex direction="column" className={styles['text-wrapper']} gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.SPECIALIZATION_TITLE)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.SPECIALIZATION_LABEL)}
						</Text>
					</Flex>
					<FormControl name="specializations" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<SpecializationSelect onChange={onChange} value={value} hasMultiple={false} />
							</div>
						)}
					</FormControl>
				</Flex>

				<Flex gap="120">
					<Flex direction="column" className={styles['text-wrapper']} gap="8">
						<Text variant="body3-strong" color="black-800">
							{t(Collections.KEYWORDS_TITLE)}
						</Text>
						<Text variant="body2" color="black-800">
							{t(Collections.KEYWORDS_LABEL)}
						</Text>
					</Flex>
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
				</Flex>

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
