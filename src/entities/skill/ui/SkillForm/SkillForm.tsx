import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { SkillFormValues } from '../../model/types/skill';

import styles from './SkillForm.module.css';

export const SkillForm = () => {
	const { t } = useTranslation('skill');
	const {
		register,
		formState: { errors },
	} = useFormContext<SkillFormValues>();
	// eslint-disable-next-line no-console
	console.log(errors);
	return (
		<Flex direction="column" gap="8">
			<Flex align="center" gap="8">
				<label htmlFor="title">{t(Skills.TITLE)}</label>
				<input className={styles.input} {...register('title')} />
			</Flex>
			{errors.title ? <div>{errors.title.message}</div> : null}
			<Flex align="center" gap="8">
				<label htmlFor="description">{t(Skills.DESCRIPTION)}</label>
				<input className={styles.input} {...register('description')} />
			</Flex>
			{errors.description ? <div>{errors.description.message}</div> : null}
		</Flex>
	);
};
