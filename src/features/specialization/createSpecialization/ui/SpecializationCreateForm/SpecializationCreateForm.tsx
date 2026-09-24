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

const defaultValues = {
	title: '',
	description: '',
} satisfies DefaultValues<CreateSpecializationFormValues>;

export const SpecializationCreateForm = () => {
	const methods = useForm<CreateSpecializationFormValues>({
		resolver: yupResolver(specializationCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateSpecializationFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

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
