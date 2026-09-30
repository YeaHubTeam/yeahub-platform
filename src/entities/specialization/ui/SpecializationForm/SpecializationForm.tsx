import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormInputText } from '@/shared/ui/Form/FormInputText';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

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
				<FormInputText
					label={t(Specializations.TITLE_FULL)}
					description={t(Specializations.TITLE_LABEL)}
					name="title"
					control={control}
					formControlClassName={styles['input-form']}
					inputClassName={styles.input}
					placeholder={t(Specializations.TITLE_FULL)}
					size="L"
				/>
				<FormField
					label={t(Specializations.DESCRIPTION_FULL)}
					description={t(Specializations.DESCRIPTION_LABEL)}
					direction="column"
				>
					<FormControl name="description" control={control} className={styles['input-form']}>
						{(register, hasError) => (
							<TextArea
								className={styles['text-area']}
								state={hasError ? 'error' : 'default'}
								placeholder={t(Specializations.DESCRIPTION_PLACEHOLDER)}
								{...register}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</Flex>
	);
};
