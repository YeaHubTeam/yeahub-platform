import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { KeywordInput } from '@/shared/ui/KeywordInput/KeywordInput';
import { Range } from '@/shared/ui/Range';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';
import { TextEditor } from '@/shared/ui/TextEditor';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SkillSelect } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

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
			<Flex direction="column">
				<Text variant="body3-strong" color="black-800">
					{t(Questions.TITLE_SHORT)}
				</Text>
				<FormControl name="title" control={control} label={t(Questions.TITLE_LABEL)}>
					{(field, hasError) => (
						<TextArea {...field} state={hasError ? 'error' : 'default'} className={styles.title} />
					)}
				</FormControl>
			</Flex>
			<Flex direction="column">
				<Text variant="body3-strong" color="black-800">
					{t(Questions.DESCRIPTION_TITLE)}
				</Text>
				<FormControl name="description" control={control} label={t(Questions.DESCRIPTION_LABEL)}>
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
					<Text variant="body3-strong" color="black-800">
						{t(Questions.RATE_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.RATE_LABEL)}
					</Text>
				</Flex>
				<FormControl name="rate" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={5} step={1} hasScale {...field} />}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" justify="center" className={styles.titles}>
					<Text variant="body3-strong" color="black-800">
						{t(Questions.COMPLEXITY_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.COMPLEXITY_LABEL)}
					</Text>
				</Flex>
				<FormControl name="complexity" control={control} className={styles.rate}>
					{(field) => <Range min={1} max={10} step={1} hasScale {...field} />}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" justify="center" className={styles.titles}>
					<Text variant="body3-strong" color="black-800">
						{t(Questions.STATUS_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.STATUS_LABEL)}
					</Text>
				</Flex>
				<FormControl name="status" control={control}>
					{({ onChange, value }) => (
						<Dropdown
							width={320}
							label={t(Questions.STATUS_LABEL)}
							onSelect={(val) => onChange(String(val))}
							value={questionStatusesItems.find((status) => status.value === value)?.label || ''}
						>
							{questionStatusesItems.map((option) => (
								<Option value={option.value} label={option.label} key={option.label} />
							))}
						</Dropdown>
					)}
				</FormControl>
			</Flex>
			<Flex gap={'32'}>
				<Flex direction="column" className={styles.titles}>
					<Text variant="body3-strong" color="black-800">
						{t(Questions.SPECIALIZATION_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.SPECIALIZATION_LABEL)}
					</Text>
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
					<Text variant="body3-strong" color="black-800">
						{t(Questions.SKILLS_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.SKILLS_LABEL)}
					</Text>
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
					<Text variant="body3-strong" color="black-800">
						{t(Questions.KEYWORDS_TITLE)}
					</Text>
					<Text variant="body2" color="black-800">
						{t(Questions.KEYWORDS_LABEL)}
					</Text>
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
				<Text variant="body3-strong" color="black-800">
					{t(Questions.SHORT_ANSWER_TITLE)}
				</Text>
				<FormControl name="shortAnswer" control={control} label={t(Questions.SHORT_ANSWER_LABEL)}>
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
				<Text variant="body3-strong" color="black-800">
					{t(Questions.LONG_ANSWER_TITLE)}
				</Text>
				<FormControl name="longAnswer" control={control} label={t(Questions.LONG_ANSWER_LABEL)}>
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
