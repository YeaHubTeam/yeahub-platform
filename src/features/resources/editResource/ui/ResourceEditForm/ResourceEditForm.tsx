import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Resource, ResourceForm } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { resourceEditSchema } from '../../model/lib/validation/resourceEditSchema';
import { EditResourceFormValues } from '../../model/types/resourcesEditTypes';
import { ResourceEditFormHeader } from '../ResourceEditFormHeader/ResourceEditFormHeader';

import styles from './ResourceEditForm.module.css';

interface ResourceEditFormProps {
	resource?: Resource;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceEditForm = ({ resource }: ResourceEditFormProps) => {
	const { resourceSkills, resourceSpecializations, ...formattedResources } = resource;

	const methods = useForm<EditResourceFormValues>({
		resolver: yupResolver(resourceEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedResources,
			skills: formatToFormField<Skill[]>(resourceSkills),
			specializations: formatToFormField<Specialization[]>(resourceSpecializations),
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ResourceEditFormHeader />
					<Card className={styles.content}>
						<ResourceForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
