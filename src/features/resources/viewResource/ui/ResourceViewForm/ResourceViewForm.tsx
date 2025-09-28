import { FormProvider, useForm } from 'react-hook-form';

import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { ResourceViewFormWithHeader } from '../ResourceViewFormWithHeader/ResourceViewFormWithHeader';

interface ResourceEditFormProps {
	resource: Resource;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceViewForm = ({ resource }: ResourceEditFormProps) => {
	const { skills, specializations, type, ...formattedResources } = resource;

	const methods = useForm<CreateOrEditOrViewResourceFormValues>({
		defaultValues: {
			...formattedResources,
			resourceSkills: formatToFormField<Skill[]>(skills),
			resourceSpecializations: formatToFormField<Specialization[]>(specializations),
			type: type.code,
		},
	});

	return (
		<FormProvider {...methods}>
			<ResourceViewFormWithHeader />
		</FormProvider>
	);
};
