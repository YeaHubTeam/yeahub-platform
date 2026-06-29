import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Topics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { SkillSelect } from '@/entities/skill/@x/topic';

import { CreateOrEditTopicFormValues } from '../../model/types/topic';

import styles from './TopicForm.module.css';

interface TopicFormProps {
	isEdit?: boolean;
}

export const TopicForm = ({ isEdit }: TopicFormProps) => {
	const { t } = useTranslation(i18Namespace.topic);
	const { control } = useFormContext<CreateOrEditTopicFormValues>();

	return (
		<Flex direction="column" className={styles.wrapper}>
			<Text variant="body5-strong">
				{isEdit ? t(Topics.EDIT_PAGE_TITLE) : t(Topics.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormField label={t(Topics.TITLE_FULL)} description={t(Topics.TITLE_LABEL)}>
					<FormControl name="title" control={control} className={styles['input-form']}>
						{(register, hasError) => (
							<Input
								{...register}
								className={styles.input}
								placeholder={t(Topics.TITLE_FULL)}
								error={hasError}
								size="L"
							/>
						)}
					</FormControl>
				</FormField>
				<FormField label={t(Marketplace.SKILLS_SHORT)} description={t(Marketplace.SKILLS_LABEL)}>
					<FormControl name="skillId" control={control}>
						{({ onChange, value }) => {
							return (
								<div>
									<SkillSelect
										onChange={onChange}
										value={value}
										hasMultiple={false}
										withSpecialization={false}
									/>
								</div>
							);
						}}
					</FormControl>
				</FormField>
				<FormField
					label={t(Topics.DESCRIPTION_FULL)}
					description={t(Topics.DESCRIPTION_LABEL)}
					direction="column"
				>
					<FormControl name="description" control={control} className={styles['input-form']}>
						{(register, hasError) => (
							<TextArea
								className={styles['text-area']}
								state={hasError ? 'error' : 'default'}
								placeholder={t(Topics.DESCRIPTION_PLACEHOLDER)}
								{...register}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</Flex>
	);
};
