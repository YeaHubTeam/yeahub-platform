import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ResourceRequest, ResourceRequestFormValues } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { ResourceRequestViewFormWithHeader } from '../ResourceRequestViewFormWithHeader/ResourceRequestViewFormWithHeader';

interface ResourceEditFormProps {
	resource: ResourceRequest;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceRequestViewForm = ({ resource }: ResourceEditFormProps) => {
	const { skills, specializations, status, requestPayload } = resource;

	const methods = useForm<ResourceRequestFormValues>({
		defaultValues: {
			skills: formatToFormField<Skill[]>(skills),
			specializations: formatToFormField<Specialization[]>(specializations),
			name: requestPayload.name,
			description: requestPayload.description,
			type: requestPayload.type,
			url: requestPayload.url,
			keywords: requestPayload.keywords,
			iconBase64: requestPayload.iconBase64,
			status: status,
		},
	});

	useEffect(() => {
		if (resource) {
			methods.reset({
				skills: formatToFormField<Skill[]>(resource.skills),
				specializations: formatToFormField<Specialization[]>(resource.specializations),
				name: resource.requestPayload.name,
				description: resource.requestPayload.description,
				type: resource.requestPayload.type,
				url: resource.requestPayload.url,
				keywords: resource.requestPayload.keywords,
				iconBase64: resource.requestPayload.iconBase64,
				status: resource.status,
			});
		}
	}, [resource, methods]);

	return (
		<FormProvider {...methods}>
			<ResourceRequestViewFormWithHeader />
		</FormProvider>
	);
};
