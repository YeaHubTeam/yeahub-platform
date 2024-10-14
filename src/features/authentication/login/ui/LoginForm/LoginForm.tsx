import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { FormControl } from '@/shared/ui/FormControl';

import { Auth, useLoginMutation } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [loginMutation, { isLoading }] = useLoginMutation();
	const { t } = useI18nHelpers(i18Namespace.auth);
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
					<FormControl name="username" control={control} label={t('login.email')}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t('login.emailPlaceholder')}
							/>
						)}
					</FormControl>
				</div>

				<div className={styles['input-wrapper']}>
					<FormControl name="password" control={control} label={t('login.password')}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t('login.passwordPlaceholder')}
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
