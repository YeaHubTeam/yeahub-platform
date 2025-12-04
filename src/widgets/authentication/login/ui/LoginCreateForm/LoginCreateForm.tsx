import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Flex } from '@/shared/ui/Flex';

import { RegistrationLabel } from '@/entities/auth';

import { LoginForm, TelegramLogin } from '@/features/authentication/login';

import { loginSchema } from '../../lib/validation/loginSchema';
import { LoginSchema } from '../../model/types/loginTypes';

import styles from './LoginCreateForm.module.css';

export const LoginCreateForm = () => {
	const methods = useForm<LoginSchema>({
		resolver: yupResolver(loginSchema),
		mode: 'onTouched',
	});
	return (
		<Flex direction="column" justify="between" className={styles.wrapper}>
			<Flex direction="column" className={styles.form}>
				<FormProvider {...methods}>
					<LoginForm />
				</FormProvider>
				<TelegramLogin />
			</Flex>
			<RegistrationLabel />
		</Flex>
	);
};
