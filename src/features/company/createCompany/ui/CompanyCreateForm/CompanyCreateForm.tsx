import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CompanyForm } from '@/entities/company';

import { CreateCompanyFormValues } from '@/features/company/createCompany/model/types/companyCreateTypes';

import { companyCreateSchema } from '../../model/lib/validation/companyCreateSchema';
import { CompanyCreateFormHeader } from '../CompanyCreateFormHeader/CompanyCreateFormHeader';

import styles from './CompanyCreateForm.module.css';

export const CompanyCreateForm = () => {
	const companyMethods = useForm<CreateCompanyFormValues>({
		resolver: yupResolver(companyCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitting, isSubmitted } = companyMethods.formState;

	return (
		<>
			<FormProvider {...companyMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<CompanyCreateFormHeader />
						<Card className={styles.content}>
							<CompanyForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
