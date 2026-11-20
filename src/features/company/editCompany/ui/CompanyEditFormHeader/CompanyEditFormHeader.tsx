import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditCompanyMutation } from '../../api/editCompanyApi';
import {
	CompanyEditBodyRequest,
	CompanyEditFormValues,
} from '../../model/types/companyEditPageTypes';

export const CompanyEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit } = useFormContext<CompanyEditFormValues>();
	const [editCompanyMutation, { isLoading: editLoading }] = useEditCompanyMutation();

	const onEditCompany = async (data: CompanyEditFormValues) => {
		const { imageSrc, companyImage, ...companyData } = data;

		const requestData: CompanyEditBodyRequest = {
			...companyData,
			...(companyImage ? { companyImage } : { imageSrc }),
		};

		await editCompanyMutation(requestData);
	};

	return (
		<BackHeader>
			<FormCancelButton disabled={editLoading} />
			<Button disabled={editLoading} onClick={handleSubmit(onEditCompany)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
