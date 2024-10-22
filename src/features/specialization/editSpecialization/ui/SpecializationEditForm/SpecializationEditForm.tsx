import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

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

	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SpecializationEditFormHeader />
					<SpecializationForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
