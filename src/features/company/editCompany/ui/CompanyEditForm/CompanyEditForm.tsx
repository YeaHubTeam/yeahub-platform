import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Company, CompanyForm } from '@/entities/company';

import { companyEditSchema } from '../../lib/validation/companyEditSchema';
import { CompanyEditFormValues } from '../../model/types/companyEditPageTypes';
import { CompanyEditFormHeader } from '../CompanyEditFormHeader/CompanyEditFormHeader';

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

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<CompanyEditFormHeader />
					<Card className={styles.content}>
						<CompanyForm isEdit imageSrc={company.imageSrc} />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
