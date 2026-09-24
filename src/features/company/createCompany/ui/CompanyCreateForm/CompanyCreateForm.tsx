import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CompanyForm } from '@/entities/company';

import { companyCreateSchema } from '../../lib/validation/companyCreateSchema';
import { CreateCompanyFormValues } from '../../model/types/companyCreateTypes';
import { CompanyCreateFormHeader } from '../CompanyCreateFormHeader/CompanyCreateFormHeader';

import styles from './CompanyCreateForm.module.css';

const defaultValues = {
	title: '',
} satisfies DefaultValues<CreateCompanyFormValues>;

export const CompanyCreateForm = () => {
	const companyMethods = useForm<CreateCompanyFormValues>({
		resolver: yupResolver(companyCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateCompanyFormValues>({
		watch: companyMethods.watch,
		reset: companyMethods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitting, isSubmitted } = companyMethods.formState;

	return (
		<>
			<FormProvider {...companyMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<CompanyCreateFormHeader onSuccess={clearFormDraft} />
						<Card className={styles.content}>
							<CompanyForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
