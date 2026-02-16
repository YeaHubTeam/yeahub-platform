import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { KeywordInput } from '@/shared/ui/KeywordInput';
import { KeywordSelect } from '@/shared/ui/KeywordSelect';
import { Range } from '@/shared/ui/Range';
import { TextArea } from '@/shared/ui/TextArea';
import { TextEditor } from '@/shared/ui/TextEditor';

import { SkillSelect } from '@/entities/skill/@x/question';
import { SpecializationSelect } from '@/entities/specialization/@x/question';

import { useGetQuestionsFilterKeywordsQuery } from '../../api/questionApi';
import { QuestionStatus } from '../../model/types/question';

import styles from './QuestionForm.module.css';

export const QuestionForm = () => {
	const { t } = useTranslation(i18Namespace.questions);

	const { control, watch } = useFormContext();
	const selectedSpecializations = watch('specializations');

	const questionStatusesItems: { label: string; value: QuestionStatus }[] = [
		{
			label: t(Questions.STATUS_PUBLIC),
			value: 'public',
		},
		{
			label: t(Questions.STATUS_DRAFT),
			value: 'draft',
		},
	];

	return (
		<Flex direction="column" gap="40">
			<FormField
				label={t(Questions.TITLE_SHORT)}
				description={t(Questions.TITLE_LABEL)}
				direction="column"
			>
				<FormControl name="title" control={control}>
					{(field, hasError) => (
						<TextArea
							{...field}
							state={hasError ? 'error' : 'default'}
							className={styles.title}
							placeholder={t(Questions.TITLE_PLACEHOLDER)}
							limit={255}
						/>
					)}
				</FormControl>
			</FormField>

			<FormField
				label={t(Questions.DESCRIPTION_TITLE)}
				description={t(Questions.DESCRIPTION_LABEL)}
				direction="column"
			>
				<FormControl name="description" control={control}>
					{(field, hasError) => (
						<TextArea
							id="description"
							className={styles.description}
							state={hasError ? 'error' : 'default'}
							placeholder={t(Questions.DESCRIPTION_PLACEHOLDER)}
							limit={1000}
							{...field}
						/>
					)}
				</FormControl>
			</FormField>

			<FormField label={t(Questions.RATE_TITLE)} description={t(Questions.RATE_LABEL)}>
				<FormControl name="rate" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={5} step={1} hasScale {...field} />}
				</FormControl>
			</FormField>

			<FormField label={t(Questions.COMPLEXITY_TITLE)} description={t(Questions.COMPLEXITY_LABEL)}>
				<FormControl name="complexity" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={10} step={1} hasScale {...field} />}
				</FormControl>
			</FormField>

			<FormField label={t(Questions.STATUS_TITLE)} description={t(Questions.STATUS_LABEL)}>
				<FormControl name="status" control={control}>
					{({ onChange, value }) => (
						<Dropdown
							width={320}
							label={t(Questions.STATUS_LABEL)}
							onSelect={(val) => onChange(String(val))}
							value={questionStatusesItems.find((status) => status.value === value)?.label || ''}
							disabled={true}
						>
							{questionStatusesItems.map((option) => (
								<Option value={option.value} label={option.label} key={option.label} />
							))}
						</Dropdown>
					)}
				</FormControl>
			</FormField>

			<FormField
				label={t(Questions.SPECIALIZATION_TITLE)}
				description={t(Questions.SPECIALIZATION_LABEL)}
			>
				<FormControl name="specializations" control={control}>
					{({ onChange, value, onBlur }) => (
						<div className={styles.select}>
							<SpecializationSelect onChange={onChange} value={value} hasMultiple onBlur={onBlur} />
						</div>
					)}
				</FormControl>
			</FormField>

			{selectedSpecializations?.length ? (
				<FormField label={t(Questions.SKILLS_TITLE)} description={t(Questions.SKILLS_LABEL)}>
					<FormControl name="skills" control={control}>
						{({ onChange, value, onBlur }) => (
							<div className={styles.select}>
								<SkillSelect
									onChange={onChange}
									value={value}
									onBlur={onBlur}
									selectedSpecializations={selectedSpecializations}
								/>
							</div>
						)}
					</FormControl>
				</FormField>
			) : null}

			<FormField label={t(Questions.KEYWORDS_TITLE)} description={t(Questions.KEYWORDS_LABEL)}>
				<FormControl name="keywords" control={control}>
					{({ onChange, value, onBlur }) => {
						const currentKeywords = Array.isArray(value) ? value : [];

						return (
							<div className={styles.select}>
								<KeywordSelect
									getKeywordsQuery={useGetQuestionsFilterKeywordsQuery}
									value={undefined}
									onChange={(keyword) => {
										if (keyword && !currentKeywords.includes(keyword)) {
											onChange([...currentKeywords, keyword]);
											onBlur();
										}
									}}
									selectedKeywords={currentKeywords}
									showLabel={false}
									showSelected={false}
									width={360}
									label={t(Questions.KEYWORDS_FILTER_PLACEHOLDER)}
								/>
								<KeywordInput
									value={currentKeywords}
									onChange={(newValue) => {
										onChange(newValue);
										onBlur();
									}}
								/>
							</div>
						);
					}}
				</FormControl>
			</FormField>

			<FormField
				label={t(Questions.SHORT_ANSWER_TITLE)}
				description={t(Questions.SHORT_ANSWER_LABEL)}
				direction="column"
			>
				<FormControl name="shortAnswer" control={control}>
					{(field) => (
						<TextEditor
							id="shortAnswer"
							isInline
							className={styles.input}
							data={field.value}
							limit={5000}
							{...field}
						/>
					)}
				</FormControl>
			</FormField>

			<FormField
				label={t(Questions.LONG_ANSWER_TITLE)}
				description={t(Questions.LONG_ANSWER_LABEL)}
				direction="column"
			>
				<FormControl name="longAnswer" control={control}>
					{(field) => (
						<TextEditor
							id="longAnswer"
							isInline
							className={styles.input}
							data={field.value}
							limit={10000}
							{...field}
						/>
					)}
				</FormControl>
			</FormField>
		</Flex>
	);
};
