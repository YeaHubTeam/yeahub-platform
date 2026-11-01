import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormInputDescription } from '@/shared/ui/form';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

import { CreateOrEditSpecializationFormValues } from '../../model/types/specialization';

import styles from './SpecializationForm.module.css';

interface SpecializationFormProps {
	isEdit?: boolean;
}

export const SpecializationForm = ({ isEdit }: SpecializationFormProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { control } = useFormContext<CreateOrEditSpecializationFormValues>();

	return (
		<Flex direction="column" className={styles.wrapper}>
			<Text variant="body6" className={styles['title-form']}>
				{isEdit ? t(Specializations.EDIT_PAGE_TITLE) : t(Specializations.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="40">
				<FormField
					label={t(Specializations.TITLE_FULL)}
					description={t(Specializations.TITLE_LABEL)}
				>
					<FormControl name="title" control={control} className={styles['input-form']}>
						{(register, hasError) => (
							<Input
								{...register}
								className={styles.input}
								placeholder={t(Specializations.TITLE_FULL)}
								error={hasError}
								size="L"
							/>
						)}
					</FormControl>
				</FormField>
				<FormInputDescription
					name="description"
					label={t(Specializations.DESCRIPTION_FULL)}
					description={t(Specializations.DESCRIPTION_LABEL)}
					placeholder={t(Specializations.DESCRIPTION_PLACEHOLDER)}
					className={styles['text-area']}
					direction="column"
				/>
			</Flex>
		</Flex>
	);
};
