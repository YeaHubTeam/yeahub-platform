import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Specialization as SpecializationI18 } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { CreateOrEditSpecializationFormValues } from '../../model/types/specialization';

import styles from './SpecializationForm.module.css';

export const SpecializationForm = () => {
	const { t } = useTranslation('specialization');
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateOrEditSpecializationFormValues>();

	return (
		<Flex direction="column" gap="8">
			<Flex align="center" gap="8">
				<label htmlFor="title">{t(SpecializationI18.SPECIALIZATION_TITLE)}</label>
				<input className={styles.input} {...register('title')} />
			</Flex>
			{errors.title ? <div>{errors.title.message}</div> : null}
			<Flex align="center" gap="8">
				<label htmlFor="description">{t(SpecializationI18.SPECIALIZATION_DESCRIPTION)}</label>
				<input className={styles.input} {...register('description')} />
			</Flex>
			{errors.description ? <div>{errors.description.message}</div> : null}
		</Flex>
	);
};
