import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { resourceCreateSchema } from '../../model/lib/validation/resourceCreateSchema';
import { CreateResourceFormValues } from '../../model/types/resourceCreateTypes';
import { ResourceCreateFormWithHeader } from '../ResourceCreateFormWithHeader/ResourceCreateFormWithHeader';

export const ResourceCreateForm = () => {
	const methods = useForm<CreateResourceFormValues>({
		resolver: yupResolver(resourceCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			name: '',
			url: '',
			description: '',
			iconBase64: '',
			skills: [],
			specializations: [],
			keywords: [],
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceCreateFormWithHeader />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
