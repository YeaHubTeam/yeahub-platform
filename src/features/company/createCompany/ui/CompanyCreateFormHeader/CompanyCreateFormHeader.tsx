import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateCompanyMutation } from '@/features/company/createCompany/api/createCompanyApi';

import { CreateCompanyFormValues } from '../../model/types/companyCreateTypes';

export const CompanyCreateFormHeader = () => {
	const [createCompanyMutation, { isLoading }] = useCreateCompanyMutation();
	const { handleSubmit } = useFormContext<CreateCompanyFormValues>();
	const { t } = useTranslation(['company', 'translation']);

	const onCreateCompany = async (data: CreateCompanyFormValues) => {
		await createCompanyMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateCompany)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
