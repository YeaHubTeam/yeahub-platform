import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

import { useEditCompanyMutation } from '../../api/editCompanyApi';
import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

export const CompanyEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, getValues } = useFormContext<CompanyEditFormValues>();
	const { id } = getValues();
	const [editCompanyMutation, { isLoading: editLoading }] = useEditCompanyMutation();

	const onEditCompany = async (data: CompanyEditFormValues) => {
		await editCompanyMutation(data);
	};

	return (
		<BackHeader>
			<DeleteCompanyButton companyId={id} isDetailPage />

			<Button disabled={editLoading} onClick={handleSubmit(onEditCompany)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
