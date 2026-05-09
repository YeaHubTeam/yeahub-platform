import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { referralLinkCreateSchema } from '../../lib/validation/referralLinkCreateSchema';
import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';
import { ReferralLinkCreateFormWithHeader } from '../ReferralLinkCreateFormWithHeader/ReferralLinkCreateFormWithHeader';

export const ReferralLinkCreateForm = () => {
	const BASE_URL = `${process.env.APP_URL}?ref_id=`;
	const methods = useForm<CreateRefferalLinkFormValues>({
		resolver: yupResolver(referralLinkCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			refCode: '',
			url: BASE_URL,
			ownerId: '',
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ReferralLinkCreateFormWithHeader />
			</LeavingPageBlocker>
		</FormProvider>
	);
};
