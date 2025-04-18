import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditCompanyMutation, useDeleteCompanyMutation } from '../../api/editCompanyApi';
import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

export const CompanyEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, getValues } = useFormContext<CompanyEditFormValues>();

	const [editCompanyMutation, { isLoading: editLoading }] = useEditCompanyMutation();
	const [deleteCompanyMutation, { isLoading: deleteLoading }] = useDeleteCompanyMutation();

	const onEditCompany = async (data: CompanyEditFormValues) => {
		await editCompanyMutation(data);
	};

	const onDeleteCompany = async () => {
		const { id } = getValues();
		await deleteCompanyMutation(id);
	};

	return (
		<BackHeader>
			<Button
				disabled={editLoading || deleteLoading}
				onClick={onDeleteCompany}
				variant="destructive"
			>
				{t(Translation.DELETE)}
			</Button>
			<Button disabled={editLoading || deleteLoading} onClick={handleSubmit(onEditCompany)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
