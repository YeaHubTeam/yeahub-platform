import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditSpecializationMutation } from '../../api/editSpecializationApi';
import { EditSpecializationFormValues } from '../../model/types/specializationEditPageTypes';

export const SpecializationEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit } = useFormContext<EditSpecializationFormValues>();

	const [editSpecializationMutation, { isLoading }] = useEditSpecializationMutation();

	const onEditSpecialization = (data: EditSpecializationFormValues) => {
		editSpecializationMutation(data);
	};

	return (
		<BackHeader>
			<FormCancelButton disabled={isLoading} />

			<Button disabled={isLoading} onClick={handleSubmit(onEditSpecialization)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
