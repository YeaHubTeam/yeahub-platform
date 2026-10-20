import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { KeywordInput } from '@/shared/ui/KeywordInput';
import { KeywordSelect } from '@/shared/ui/KeywordSelect';
import { Range } from '@/shared/ui/Range';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { SkillSelect } from '@/entities/skill/@x/testQuestion';
import { SpecializationSelect } from '@/entities/specialization/@x/testQuestion';

import { useGetTestQuestionKeywordsQuery } from '../../api/testQuestionApi';
import { TestQuestionVariants } from '../TestQuestionVariants/TestQuestionVariants';

import styles from './TestQuestionForm.module.css';

export const TestQuestionForm = () => {
	const { control, watch } = useFormContext();
	const { t } = useTranslation(i18Namespace.testQuestion);

	const selectedSpecializations = watch('specializations');

	return (
		<>
			<Text variant="body5-strong" className={styles['main-title']}>
				{t(TestQuestions.CREATE_TITLE)}
			</Text>

			<Flex direction="column" gap="40">
				<FormField
					label={t(TestQuestions.TITLE_LABEL)}
					description={t(TestQuestions.TITLE_DESCRIPTION)}
				>
					<FormControl name="title" control={control} className={styles.input}>
						{(register, hasError) => (
							<Input
								{...register}
								error={hasError}
								placeholder={t(TestQuestions.TITLE_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(TestQuestions.DESCRIPTION_LABEL)}
					description={t(TestQuestions.DESCRIPTION_DESCRIPTION)}
					direction="column"
				>
					<FormControl name="description" control={control}>
						{(register, hasError) => (
							<TextArea
								{...register}
								id="description"
								className={styles.description}
								state={hasError ? 'error' : 'default'}
								placeholder={t(TestQuestions.DESCRIPTION_PLACEHOLDER)}
								limit={1000}
							/>
						)}
					</FormControl>
				</FormField>

				<Flex direction="column" gap="20">
					<Text variant="body5-strong">{t(TestQuestions.SETTINGS_TITLE)}</Text>

					<FormField
						label={t(TestQuestions.RATE_LABEL)}
						description={t(TestQuestions.RATE_DESCRIPTION)}
					>
						<FormControl name="rate" control={control} className={styles.rate}>
							{(field) => <Range min={1} max={5} step={1} hasScale {...field} />}
						</FormControl>
					</FormField>

					<FormField
						label={t(TestQuestions.COMPLEXITY_LABEL)}
						description={t(TestQuestions.COMPLEXITY_DESCRIPTION)}
					>
						<FormControl name="complexity" control={control} className={styles.rate}>
							{(field) => <Range min={1} max={10} step={1} hasScale {...field} />}
						</FormControl>
					</FormField>

					<FormField
						label={t(TestQuestions.KEYWORDS_LABEL)}
						description={t(TestQuestions.KEYWORDS_DESCRIPTION)}
					>
						<FormControl name="keywords" control={control}>
							{({ onChange, value }) => {
								const currentKeywords = Array.isArray(value) ? value : [];

								return (
									<Flex direction="column" gap="32">
										<KeywordSelect
											getKeywordsQuery={useGetTestQuestionKeywordsQuery}
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
											label={t(TestQuestions.KEYWORDS_ADD)}
										/>

										<KeywordInput value={currentKeywords} onChange={onChange} />
									</Flex>
								);
							}}
						</FormControl>
					</FormField>
				</Flex>

				<Flex direction="column" gap="20">
					<Text variant="body5-strong">{t(TestQuestions.ANSWER_VARIANTS_TITLE)}</Text>

					<Text variant="body2">{t(TestQuestions.ANSWER_VARIANTS_DESCRIPTION)}</Text>

					<FormControl name="variants" control={control}>
						{({ value: variants, onChange: onVariantsChange }) => (
							<FormControl name="successVariants" control={control}>
								{({ value: successVariants, onChange: onSuccessVariantsChange }) => (
									<TestQuestionVariants
										variants={variants}
										onVariantsChange={onVariantsChange}
										successVariants={successVariants}
										onSuccessVariantsChange={onSuccessVariantsChange}
									/>
								)}
							</FormControl>
						)}
					</FormControl>
				</Flex>

				<FormField
					label={t(TestQuestions.SPECIALIZATIONS_LABEL)}
					description={t(TestQuestions.SPECIALIZATIONS_DESCRIPTION)}
				>
					<FormControl name="specializations" control={control}>
						{({ onChange, value }) => (
							<div className={styles.select}>
								<SpecializationSelect onChange={onChange} value={value} hasMultiple />
							</div>
						)}
					</FormControl>
				</FormField>

				{selectedSpecializations?.length ? (
					<FormField
						label={t(TestQuestions.SKILLS_LABEL)}
						description={t(TestQuestions.SKILLS_DESCRIPTION)}
					>
						<FormControl name="skills" control={control}>
							{({ onChange, value }) => (
								<div className={styles.select}>
									<SkillSelect
										onChange={onChange}
										value={value}
										selectedSpecializations={selectedSpecializations}
									/>
								</div>
							)}
						</FormControl>
					</FormField>
				) : null}
			</Flex>
		</>
	);
};
