import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Specialization, SpecializationForm } from '@/entities/specialization';

import { specializationEditSchema } from '../../model/lib/validation/specializationEditSchema';
import { SpecializationEditFormHeader } from '../SpecializationEditFormHeader/SpecializationEditFormHeader';

import styles from './SpecializationEditForm.module.css';

interface SpecializationEditFormProps {
	specialization: Specialization;
}

export const SpecializationEditForm = ({ specialization }: SpecializationEditFormProps) => {
	const methods = useForm<Specialization>({
		resolver: yupResolver(specializationEditSchema),
		mode: 'onTouched',
		defaultValues: { ...specialization },
	});

	useEffect(() => {}, [methods.formState.isDirty, methods.formState.isSubmitted]);

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			methods.formState.isDirty &&
			!methods.formState.isSubmitted &&
			currentLocation.pathname !== nextLocation.pathname,
	);

	return (
		<FormProvider {...methods}>
			{blocker.state === 'blocked' ? (
				<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SpecializationEditFormHeader />
					<SpecializationForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
