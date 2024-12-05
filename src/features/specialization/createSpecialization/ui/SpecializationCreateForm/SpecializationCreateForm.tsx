import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationForm } from '@/entities/specialization';

import { specializationCreateSchema } from '../../model/lib/validation/specializationCreateSchema';
import { CreateSpecializationFormValues } from '../../model/types/specializationCreateTypes';
import { SpecializationCreateFormHeader } from '../SpecializationCreateFormHeader/SpecializationCreateFormHeader';

import styles from './SpecializationCreateForm.module.css';

export const SpecializationCreateForm = () => {
	const methods = useForm<CreateSpecializationFormValues>({
		resolver: yupResolver(specializationCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			isDirty &&
			!isSubmitted &&
			!isSubmitting &&
			currentLocation.pathname !== nextLocation.pathname,
	);

	return (
		<FormProvider {...methods}>
			{blocker.state === 'blocked' ? (
				<BlockerDialog
					onCancel={blocker.reset}
					onOk={blocker.proceed}
					message={'blockModal.confirmDescription'}
				/>
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SpecializationCreateFormHeader />
					<SpecializationForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
