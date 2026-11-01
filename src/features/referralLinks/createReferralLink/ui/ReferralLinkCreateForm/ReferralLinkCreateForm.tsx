import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { referralLinkCreateSchema } from '../../lib/validation/referralLinkCreateSchema';
import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';
import { ReferralLinkCreateFormWithHeader } from '../ReferralLinkCreateFormWithHeader/ReferralLinkCreateFormWithHeader';
const BASE_URL = `${process.env.APP_URL}?ref_id=`;
const defaultValues: DefaultValues<CreateRefferalLinkFormValues> = {
	refCode: '',
	url: BASE_URL,
	ownerId: '',
};
export const ReferralLinkCreateForm = () => {
	const methods = useForm<CreateRefferalLinkFormValues>({
		resolver: yupResolver(referralLinkCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		watch,
		reset,
	} = methods;
	const { clearFormDraft } = useFormPersist<CreateRefferalLinkFormValues>({
		watch,
		reset,
		defaultValues,
	});
	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ReferralLinkCreateFormWithHeader onSuccess={clearFormDraft} />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
