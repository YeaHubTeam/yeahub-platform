import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormHeader } from '@/shared/ui/FormHeader';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Company, CompanyForm } from '@/entities/company';

import { useEditCompanyMutation } from '../../api/editCompanyApi';
import { companyEditSchema } from '../../lib/validation/companyEditSchema';
import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';

import styles from './CompanyEditForm.module.css';

interface CompanyEditFormProps {
	company: Company;
}

export const CompanyEditForm = ({ company }: CompanyEditFormProps) => {
	const methods = useForm<CompanyEditFormValues>({
		resolver: yupResolver(companyEditSchema),
		mode: 'onTouched',
		defaultValues: { ...company },
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editCompanyMutation, { isLoading }] = useEditCompanyMutation();

	const onEditCompany = async (data: CompanyEditFormValues) => {
		await editCompanyMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<FormHeader<CompanyEditFormValues> onSubmit={onEditCompany} isLoading={isLoading} />
					<Card className={styles.content}>
						<CompanyForm isEdit imageSrc={company.imageSrc} />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
