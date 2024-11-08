import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ChangePassword } from '@/features/profile/changePassword';

import { changePasswordSchema } from '../model/lib/validation/changePasswordSchema';
import { ChangePasswordSchema } from '../model/types/changePasswordSchemaTypes';

export const ChangePasswordTab = () => {
	const methods = useForm<ChangePasswordSchema>({
		resolver: yupResolver(changePasswordSchema),
		mode: 'onTouched',
	});

	return (
		<FormProvider {...methods}>
			<ChangePassword />
		</FormProvider>
	);
};
