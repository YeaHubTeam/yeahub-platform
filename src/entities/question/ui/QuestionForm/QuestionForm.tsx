import { useFormContext, useWatch } from 'react-hook-form';
import { Input, Range, Select, Text, TextArea, TextEditor } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { KeywordInput } from '@/shared/ui/KeywordInput/KeywordInput';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SkillSelect } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import { QuestionStatus } from '../../model/types/question';

import styles from './QuestionForm.module.css';

export const QuestionForm = () => {
	const { t } = useI18nHelpers(i18Namespace.questions);

	const { control } = useFormContext();

	const selectedSpecializations = useWatch({
		control,
		name: 'specializations',
	});

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
			<Flex direction="column">
				<Text title={t(Questions.TITLE)} />
				<FormControl name="title" control={control} label={t(Questions.ADD_QUESTION)}>
					{(field, hasError) => <Input {...field} hasError={hasError} />}
				</FormControl>
			</Flex>
			<Flex direction="column">
				<Text title={t(Questions.DESCRIPTION_TITLE)} />
				<FormControl name="description" control={control} label={t(Questions.DESCRIPTION_ADD)}>
					{(field, hasError) => (
						<TextArea
							id="description"
							className={styles.description}
							state={hasError ? 'error' : 'default'}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" justify="center" className={styles.titles}>
					<Text title={t(Questions.RATE_TITLE)} />
					<Text text={t(Questions.RATE_SELECT)} className={styles.label} />
				</Flex>
				<FormControl name="rate" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={5} step={1} hasScale {...field} />}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" justify="center" className={styles.titles}>
					<Text title={t(Questions.COMPLEXITY_TITLE)} />
					<Text text={t(Questions.COMPLEXITY_TITLE)} className={styles.label} />
				</Flex>
				<FormControl name="complexity" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={10} step={1} hasScale {...field} />}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" justify="center" className={styles.titles}>
					<Text title={t(Questions.STATUS_TITLE)} />
					<Text text={t(Questions.STATUS_SELECT)} className={styles.label} />
				</Flex>
				<FormControl name="status" control={control}>
					{({ onChange, value }) => (
						<div className={styles.select}>
							<Select
								type="default"
								onChange={onChange}
								value={value}
								placeholder={t(Questions.STATUS_SELECT)}
								options={questionStatusesItems}
							/>
						</div>
					)}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" className={styles.titles}>
					<Text title={t(Questions.SPECIALIZATION_TITLE)} />
					<Text text={t(Questions.SPECIALIZATION_SELECT)} className={styles.label} />
				</Flex>
				<FormControl name="specializations" control={control}>
					{({ onChange, value }) => (
						<div className={styles.select}>
							<SpecializationSelect onChange={onChange} value={value} hasMultiple />
						</div>
					)}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" className={styles.titles}>
					<Text title={t(Questions.SKILLS_TITLE)} />
					<Text text={t(Questions.SKILLS_ADD)} className={styles.label} />
				</Flex>
				<FormControl name="skills" control={control}>
					{({ onChange, value }) => {
						return (
							<div className={styles.select}>
								<SkillSelect
									onChange={onChange}
									value={value}
									selectedSPecializations={selectedSpecializations}
								/>
							</div>
						);
					}}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" className={styles.titles}>
					<Text title={t(Questions.QUESTION_KEYWORDS)} />
					<Text text={t(Questions.QUESTION_KEYWORDS)} className={styles.label} />
				</Flex>
				<FormControl name="keywords" control={control}>
					{({ onChange, value }) => {
						return (
							<div className={styles.select}>
								<KeywordInput value={value} onChange={onChange} />
							</div>
						);
					}}
				</FormControl>
			</Flex>
			<Flex direction="column">
				<Text title={t(Questions.SHORT_ANSWER_TITLE)} />
				<FormControl name="shortAnswer" control={control} label={t(Questions.SHORT_ANSWER_ADD)}>
					{(field) => (
						<TextEditor
							id="shortAnswer"
							isInline
							className={styles.input}
							data={field.value}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
			<Flex direction="column">
				<Text title={t(Questions.LONG_ANSWER_TITLE)} />
				<FormControl name="longAnswer" control={control} label={t(Questions.LONG_ANSWER_ADD)}>
					{(field) => (
						<TextEditor
							id="longAnswer"
							isInline
							className={styles.input}
							data={field.value}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
		</Flex>
	);
};
