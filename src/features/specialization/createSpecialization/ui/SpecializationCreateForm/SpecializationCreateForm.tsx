import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { SpecializationForm } from '@/entities/specialization';

import { specializationCreateSchema } from '../../lib/validation/specializationCreateSchema';
import { CreateSpecializationFormValues } from '../../model/types/specializationCreateTypes';
import { SpecializationCreateFormHeader } from '../SpecializationCreateFormHeader/SpecializationCreateFormHeader';

import styles from './SpecializationCreateForm.module.css';

const defaultValues: DefaultValues<CreateSpecializationFormValues> = {
	title: '',
	description: '',
};

export const SpecializationCreateForm = () => {
	const methods = useForm<CreateSpecializationFormValues>({
		resolver: yupResolver(specializationCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		reset,
		watch,
	} = methods;

	const { clearFormDraft } = useFormPersist<CreateSpecializationFormValues>({
		watch,
		reset,
		defaultValues,
	});

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SpecializationCreateFormHeader onSuccess={clearFormDraft} />

					<Card className={styles.content}>
						<SpecializationForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
