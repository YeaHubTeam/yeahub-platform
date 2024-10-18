import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationForm } from '@/entities/specialization';

import { specializationCreateSchema } from '../../model/lib/validation/specializationCreateSchema';
import { SpecializationCreateSchema } from '../../model/types/specializationCreateTypes';
import { SpecializationCreateFormHeader } from '../SpecializationCreateFormHeader/SpecializationCreateFormHeader';

import styles from './SpecializationCreateForm.module.css';

export const SpecializationCreateForm = () => {
	const methods = useForm<SpecializationCreateSchema>({
		resolver: yupResolver(specializationCreateSchema),
		mode: 'onTouched',
	});
	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SpecializationCreateFormHeader />
					<SpecializationForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
