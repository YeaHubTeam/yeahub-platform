import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useIsFormNonEmpty } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

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

	const { control, formState } = methods;
	const { isDirty, isSubmitted, isSubmitting } = formState;

	const isNonEmpty = useIsFormNonEmpty(control);

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && isNonEmpty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SpecializationCreateFormHeader />
					<Card className={styles.content}>
						<SpecializationForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
