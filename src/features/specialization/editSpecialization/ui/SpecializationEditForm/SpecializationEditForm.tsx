import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Specialization, SpecializationForm } from '@/entities/specialization';

import { specializationEditSchema } from '../../lib/validation/specializationEditSchema';
import { EditSpecializationFormValues } from '../../model/types/specializationEditPageTypes';
import { SpecializationEditFormHeader } from '../SpecializationEditFormHeader/SpecializationEditFormHeader';

import styles from './SpecializationEditForm.module.css';

interface SpecializationEditFormProps {
	specialization: Specialization;
}

export const SpecializationEditForm = ({ specialization }: SpecializationEditFormProps) => {
	const methods = useForm<EditSpecializationFormValues>({
		resolver: yupResolver(specializationEditSchema),
		mode: 'onTouched',
		defaultValues: { ...specialization },
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SpecializationEditFormHeader />
					<Card className={styles.content}>
						<SpecializationForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
