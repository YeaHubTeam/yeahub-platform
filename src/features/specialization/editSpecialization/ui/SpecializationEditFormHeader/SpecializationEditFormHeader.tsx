import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Specializations, Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useEditSpecializationMutation } from '../../api/editSpecializationApi';
import { EditSpecializationFormValues } from '../../model/types/specializationEditPageTypes';

export const SpecializationEditFormHeader = () => {
	const { t } = useTranslation(['specialization', 'translation']);

	const { handleSubmit, reset } = useFormContext<EditSpecializationFormValues>();

	const [editSpecializationMutation, { isLoading }] = useEditSpecializationMutation();
	const onResetFormValues = () => {
		reset();
	};

	const onEditSpecialization = async (data: EditSpecializationFormValues) => {
		await editSpecializationMutation(data);
	};

	return (
		<Flex align="center" gap="8">
			<BackButton />
			<h1>{t(Specializations.EDIT_PAGE_TITLE)}</h1>
			<Button onClick={onResetFormValues}>{t(Translation.CANCEL, { ns: 'translation' })}</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditSpecialization)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
