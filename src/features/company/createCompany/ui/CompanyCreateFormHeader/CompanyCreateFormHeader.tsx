import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateCompanyMutation } from '../../api/createCompanyApi';
import { CreateCompanyFormValues } from '../../model/types/companyCreateTypes';

interface CompanyCreateFormHeaderProps {
	onSuccess: () => void;
}

export const CompanyCreateFormHeader = ({ onSuccess }: CompanyCreateFormHeaderProps) => {
	const [createCompanyMutation, { isLoading }] = useCreateCompanyMutation();
	const { handleSubmit } = useFormContext<CreateCompanyFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onCreateCompany = async (data: CreateCompanyFormValues) => {
		try {
			await createCompanyMutation(data).unwrap();
			onSuccess();
		} catch {
			return;
		}
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} size="medium" />
				<Button disabled={isLoading} onClick={handleSubmit(onCreateCompany)}>
					{t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
		</Flex>
	);
};
