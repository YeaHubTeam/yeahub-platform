import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text, TextArea } from 'yeahub-ui-kit';

import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { SkillFormValues } from '../../model/types/skill';

import styles from './SkillForm.module.css';

export const SkillForm = () => {
	const { t } = useTranslation('skill');
	const {
		formState: { errors },
	} = useFormContext<SkillFormValues>();
	// eslint-disable-next-line no-console
	console.log(errors);

	const { control } = useFormContext();

	return (
		<Flex direction="column" gap="40">
			<Flex direction="column">
				<Text
					title={t(Skills.SKILLS_TITLE)}
					className={`${styles['title-base']} ${styles.title1}`}
				/>
				<FormControl name="title" control={control} label={t(Skills.CREATE_PAGE_TITLE)}>
					{(register, hasError) => <Input {...register} hasError={hasError} />}
				</FormControl>
			</Flex>
			<Flex direction="column">
				<Text
					title={t(Skills.DESCRIPTION_SPECIALIZATION)}
					className={`${styles.titleBase} ${styles.title2}`}
				/>
				<FormControl
					name="description"
					control={control}
					label={t(Skills.DETAILED_DESCRIPTION_SPECIALIZATION)}
				>
					{(field, hasError) => (
						<TextArea
							id="description"
							className={styles.description}
							placeholder="Развёрнутое описание для специализации"
							state={hasError ? 'error' : 'default'}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
		</Flex>
	);
};
