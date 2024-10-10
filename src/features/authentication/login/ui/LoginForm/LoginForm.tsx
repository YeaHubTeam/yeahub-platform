import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Icon, Input } from 'yeahub-ui-kit';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Auth, useLoginMutation } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [loginMutation, { isLoading }] = useLoginMutation();
	const { t } = useI18nHelpers('auth');
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
						{t('login.email')}
					</label>
					<Input
						className={styles.input}
						{...register('username')}
						placeholder={t('login.emailPlaceholder')}
						hasError={!!errors.username?.message}
					/>
					{errors.username ? <div className={styles.error}>{errors.username.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="password">
						{t('login.password')}
					</label>
					<Input
						className={styles.input}
						{...register('password')}
						placeholder={t('login.passwordPlaceholder')}
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
							{t('login.forgotPassword')}
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
				{t('buttons.login')}
			</Button>
		</div>
	);
};
