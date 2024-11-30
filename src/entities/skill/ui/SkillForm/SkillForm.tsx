import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text, TextArea } from 'yeahub-ui-kit';

import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import styles from './SkillForm.module.css';

export const SkillForm = () => {
	const { t } = useTranslation('skill');
	const {
		formState: { errors },
	} = useFormContext();
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
				<Flex direction="row" className={`${styles['skills-input']}`} gap="120">
					<Flex direction="column" gap="8">
						<Text
							title={t(Skills.TITLE_SKILL)}
							className={`${styles['title-base']} ${styles.title2}`}
						/>
						<Text
							title={t(Skills.CREATE_PAGE_TITLE)}
							className={`${styles['title-base']} ${styles.title3}`}
						/>
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex direction="column" style={{ marginTop: '60' }} gap="8">
				<Text
					title={t(Skills.DESCRIPTION_SPECIALIZATION)}
					className={`${styles['title-base']} ${styles.title2}`}
				/>
				<Text
					title={t(Skills.DETAILED_DESCRIPTION_SKILL)}
					className={`${styles['title-base']} ${styles.title3}`}
				/>
				<FormControl name="description" control={control}>
					{(field, hasError) => (
						<TextArea
							id="description"
							className={styles.description}
							placeholder={t(Skills.DETAILED_DESCRIPTION_TEXTAREA)}
							state={hasError ? 'error' : 'default'}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
		</Flex>
	);
};
