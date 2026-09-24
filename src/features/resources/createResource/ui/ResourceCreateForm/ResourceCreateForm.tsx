import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

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
} satisfies DefaultValues<CreateResourceFormValues>;

export const ResourceCreateForm = () => {
	const methods = useForm<CreateResourceFormValues>({
		resolver: yupResolver(resourceCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateResourceFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceCreateFormWithHeader onSuccess={clearFormDraft} />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
