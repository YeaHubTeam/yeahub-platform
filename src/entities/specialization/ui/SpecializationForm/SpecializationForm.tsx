import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextArea } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
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
			<Text variant="body5-strong">
				{isEdit ? t(Specializations.EDIT_PAGE_TITLE) : t(Specializations.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<Flex gap="120" className={styles['specialization-input']}>
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text variant="body4">{t(Specializations.TITLE_FULL)}</Text>
						<Text variant="body2">{t(Specializations.TITLE_LABEL)}</Text>
					</Flex>
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
				</Flex>
				<Flex direction="column" gap="20">
					<Flex direction="column" gap="8">
						<Text variant="body4">{t(Specializations.DESCRIPTION_FULL)}</Text>
						<Text variant="body2">{t(Specializations.DESCRIPTION_LABEL)}</Text>
					</Flex>
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
				</Flex>
			</Flex>
		</Flex>
	);
};
