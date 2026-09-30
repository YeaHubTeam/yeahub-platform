import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Topics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormInputText } from '@/shared/ui/Form/FormInputText';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
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
			<Text variant="body6">
				{isEdit ? t(Topics.TOPIC_EDIT_PAGE_TITLE) : t(Topics.TOPIC_CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormInputText
					label={t(Topics.TITLE_FULL)}
					description={t(Topics.TITLE_LABEL)}
					name="title"
					control={control}
					formControlClassName={styles['input-form']}
					inputClassName={styles.input}
					placeholder={t(Topics.TITLE_FULL)}
					size="L"
				/>
				<FormField label={t(Marketplace.SKILLS_SHORT)} description={t(Marketplace.SKILLS_LABEL)}>
					<FormControl name="skillId" control={control}>
						{({ onChange, value }) => {
							return (
								<div>
									<SkillSelect
										onChange={(skillIds) => {
											const skillId = Array.isArray(skillIds) ? skillIds[0] : skillIds;
											onChange(skillId);
										}}
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
