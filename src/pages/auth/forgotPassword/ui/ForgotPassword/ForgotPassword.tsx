import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { forgotPasswordSchema } from '../../lib/validation/forgotPasswordSchema';
import { ForgotPasswordSchema } from '../../model/types/forgotPasswordTypes';
import { ForgotPasswordForm } from '../ForgotPasswordForm/ForgotPasswordForm';

interface ForgotPasswordProps {
	onSubmit: (email: string) => void;
}

export const ForgotPassword = ({ onSubmit }: ForgotPasswordProps) => {
	const methods = useForm<ForgotPasswordSchema>({
		resolver: yupResolver(forgotPasswordSchema),
		mode: 'onTouched',
	});

	return (
		<FormProvider {...methods}>
			<ForgotPasswordForm onSubmit={onSubmit} />
		</FormProvider>
	);
};
