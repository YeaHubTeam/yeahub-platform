import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { referralLinkCreateSchema } from '../../lib/validation/referralLinkCreateSchema';
import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';
import { ReferralLinkCreateFormWithHeader } from '../ReferralLinkCreateFormWithHeader/ReferralLinkCreateFormWithHeader';

const BASE_URL = `${process.env.APP_URL}?ref_id=`;

const defaultValues = {
	refCode: '',
	url: BASE_URL,
	ownerId: '',
} satisfies DefaultValues<CreateRefferalLinkFormValues>;

export const ReferralLinkCreateForm = () => {
	const methods = useForm<CreateRefferalLinkFormValues>({
		resolver: yupResolver(referralLinkCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateRefferalLinkFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ReferralLinkCreateFormWithHeader onSuccess={clearFormDraft} />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
