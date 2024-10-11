import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Icon, Button } from 'yeahub-ui-kit';

import { FormControl } from '@/shared/ui/FormControl';

import { useLoginMutation } from '@/entities/auth';
import { Auth } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [loginMutation, { isLoading }] = useLoginMutation();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext<Auth>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onLogin = async (data: Auth) => {
		await loginMutation(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<FormControl name="username" control={control} label={'Электронная почта'}>
						{(field) => (
							<Input {...field} className={styles.input} placeholder="Введите электронную почту" />
						)}
					</FormControl>
				</div>

				<div className={styles['input-wrapper']}>
					<FormControl name="password" control={control} label={'Пароль'}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder="Введите пароль"
								type={isPasswordHidden ? 'text' : 'password'}
								suffix={
									<Icon
										className={styles.icon}
										onClick={handleShowPassword}
										icon="password"
										arg={isPasswordHidden}
										color={
											errors.password?.message ? '--palette-ui-red-700' : '--palette-ui-black-300'
										}
										size={24}
									/>
								}
							/>
						)}
					</FormControl>

					<div className={styles['forgot-password-link']}>
						<Button tagName="a" theme="link">
							Забыли пароль?
						</Button>
					</div>
				</div>
			</div>
			<Button
				theme="primary"
				disabled={isLoading}
				className={styles['submit-button']}
				onClick={handleSubmit(onLogin)}
			>
				Вход
			</Button>
		</div>
	);
};
