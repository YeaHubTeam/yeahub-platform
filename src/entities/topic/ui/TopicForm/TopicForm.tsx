import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { SkillSelect } from '@/entities/skill/@x/topic';

import styles from './TopicForm.module.css';

export const TopicForm = () => {
	const { t } = useTranslation(i18Namespace.topic);
	const { control } = useFormContext();

	return (
		<>
			<Text variant="body6" className={styles['main-title']}>
				{t(Topics.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormField label={t(Topics.TITLE_FULL)} description={t(Topics.TITLE_LABEL)}>
					<FormControl name="title" control={control} className={styles['input-form']}>
						{(register, hasError) => (
							<Input {...register} placeholder={t(Topics.TITLE_PLACEHOLDER)} error={hasError} />
						)}
					</FormControl>
				</FormField>

				<FormField label={t(Topics.SKILL_TITLE)} description={t(Topics.SKILL_LABEL)}>
					<FormControl name="skillId" className={styles.select} control={control}>
						{({ onChange, value }) => (
							<SkillSelect
								onChange={onChange}
								value={value}
								hasMultiple={false}
								withSpecialization={false}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField label={t(Topics.DESCRIPTION_FULL)} description={t(Topics.DESCRIPTION_LABEL)}>
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Topics.DESCRIPTION_PLACEHOLDER)}
								state={hasError ? 'error' : 'default'}
								{...field}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</>
	);
};
