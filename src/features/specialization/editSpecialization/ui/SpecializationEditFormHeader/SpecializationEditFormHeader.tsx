import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

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
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL, { ns: 'translation' })}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditSpecialization)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</BackHeader>
	);
};
