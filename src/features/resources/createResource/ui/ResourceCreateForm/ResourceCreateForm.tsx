import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { resourceCreateSchema } from '../../lib/validation/resourceCreateSchema';
import { CreateResourceFormValues } from '../../model/types/resourceCreateTypes';
import { ResourceCreateFormWithHeader } from '../ResourceCreateFormWithHeader/ResourceCreateFormWithHeader';

const defaultValues = {
	name: '',
	url: '',
	description: '',
	iconBase64: '',
	skills: [],
	specializations: [],
	keywords: [],
};

export const ResourceCreateForm = () => {
	const methods = useForm<CreateResourceFormValues>({
		resolver: yupResolver(resourceCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		watch,
		reset,
	} = methods;

	const { clearFormDraft } = useFormPersist({ watch, reset, defaultValues });

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceCreateFormWithHeader onSuccess={clearFormDraft} />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
