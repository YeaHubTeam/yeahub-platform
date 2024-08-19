import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Input, Icon, Button } from 'yeahub-ui-kit';

import { errorMessageAdapter } from '@/shared/libs/utils/errorMessageAdapter';

import { useLoginMutation } from '@/entities/auth';
import { getAuthError } from '@/entities/auth';
import { Auth } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const errorState = useSelector(getAuthError);
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [loginMutation, { isLoading }] = useLoginMutation();
	const {
		handleSubmit,
		register,
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
					<label className={styles.label} htmlFor="email">
						Электронная почта
					</label>
					<Input
						className={styles.input}
						{...register('username')}
						placeholder="Введите электронную почту"
						hasError={!!errors.username?.message}
					/>
					{errors.username ? <div className={styles.error}>{errors.username.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="password">
						Пароль
					</label>
					<Input
						className={styles.input}
						{...register('password')}
						placeholder="Введите пароль"
						type={isPasswordHidden ? 'text' : 'password'}
						hasError={!!errors.password?.message}
						suffix={
							<Icon
								className={styles.icon}
								onClick={handleShowPassword}
								icon="password"
								arg={isPasswordHidden}
								color="--palette-ui-black-300"
							/>
						}
					/>
					{errors.password ? <div className={styles.error}>{errors.password.message}</div> : null}
					<div className={styles.link}>
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
			{errorState ? (
				<div className={styles['server-error-message']}>{errorMessageAdapter(errorState)}</div>
			) : null}
		</div>
	);
};
