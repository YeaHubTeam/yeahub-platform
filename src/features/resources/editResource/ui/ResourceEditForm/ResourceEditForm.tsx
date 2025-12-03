import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Resource, ResourceForm } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { useEditResourceMutation } from '../../api/editResourceApi';
import { resourceEditSchema } from '../../lib/validation/resourceEditSchema';
import { EditResourceFormValues } from '../../model/types/resourcesEditTypes';
import { ResourceEditFormHeader } from '../ResourceEditFormHeader/ResourceEditFormHeader';

import styles from './ResourceEditForm.module.css';

interface ResourceEditFormProps {
	resource: Resource;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceEditForm = ({ resource }: ResourceEditFormProps) => {
	const { skills, specializations, type, imageSrc, ...formattedResources } = resource;

	const methods = useForm<EditResourceFormValues>({
		resolver: yupResolver(resourceEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedResources,
			iconBase64: imageSrc,
			skills: formatToFormField<Skill[]>(skills),
			specializations: formatToFormField<Specialization[]>(specializations),
			type: type.code,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editResourceMutation] = useEditResourceMutation();

	const onEditResource = async (data: EditResourceFormValues) => {
		editResourceMutation(data);
	};
	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ResourceEditFormHeader onSubmit={onEditResource} />
					<Card className={styles.content}>
						<ResourceForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
