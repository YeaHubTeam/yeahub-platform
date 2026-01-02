import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditCompanyMutation } from '../../api/editCompanyApi';
import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

export const CompanyEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit } = useFormContext<CompanyEditFormValues>();
	const [editCompanyMutation, { isLoading: editLoading }] = useEditCompanyMutation();

	const onEditCompany = async (data: CompanyEditFormValues) => {
		await editCompanyMutation(data);
	};

	return (
		<BackHeader>
			<Button disabled={editLoading} onClick={handleSubmit(onEditCompany)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
