import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { LoginFormValues, useLoginMutation } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const navigate = useNavigate();
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [loginMutation, { isLoading }] = useLoginMutation();
	const { t } = useTranslation(i18Namespace.auth);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext<LoginFormValues>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onLogin = async (data: LoginFormValues) => {
		await loginMutation(data);
	};

	const handeleForgotPassword = () => {
		navigate(ROUTES.auth['forgot-password'].page);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<FormControl name="username" control={control} label={t(Auth.FORM_EMAIL_LABEL)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.FORM_EMAIL_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</div>

				<div className={styles['input-wrapper']}>
					<FormControl name="password" control={control} label={t(Auth.FORM_PASSWORD_LABEL)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.FORM_PASSWORD_PLACEHOLDER)}
								type={isPasswordHidden ? 'text' : 'password'}
								suffix={
									<Icon
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
						<Button variant="link" onClick={handeleForgotPassword}>
							{t(Auth.LOGIN_FORGOT_PASSWORD_LINK)}
						</Button>
					</div>
				</div>
			</div>
			<Button
				variant="primary"
				disabled={isLoading}
				className={styles['submit-button']}
				onClick={handleSubmit(onLogin)}
			>
				{t(Auth.LOGIN_SUBMIT)}
			</Button>
		</div>
	);
};
