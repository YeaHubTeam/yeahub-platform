import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Flex } from '@/shared/ui/Flex';

import { TelegramLogin } from '@/features/authentication/login';
import { LoginLabel, RegisterForm } from '@/features/authentication/registration';

import { registerSchema } from '../lib/validation/registerSchema';
import { UserSchema } from '../model/types/userTypes';

import styles from './UserCreateForm.module.css';

export const UserCreateForm = () => {
	const methods = useForm<UserSchema>({
		resolver: yupResolver(registerSchema),
		mode: 'onTouched',
	});

	return (
		<Flex direction="column" justify="between" align="center" className={styles.wrapper}>
			<Flex direction="column" gap="24">
				<FormProvider {...methods}>
					<RegisterForm />
				</FormProvider>
				<TelegramLogin />
			</Flex>
			<LoginLabel />
		</Flex>
	);
};
