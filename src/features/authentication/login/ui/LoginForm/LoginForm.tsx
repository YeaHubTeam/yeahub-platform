import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';
import { PasswordInput } from '@/shared/ui/PasswordInput';

import { LoginFormValues, useLoginMutation } from '@/entities/auth';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const navigate = useNavigate();
	const [loginMutation, { isLoading }] = useLoginMutation();
	const { t } = useTranslation(i18Namespace.auth);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext<LoginFormValues>();

	const onLogin = async (data: LoginFormValues) => {
		await loginMutation(data);
	};

	const handeleForgotPassword = () => {
		navigate(ROUTES.auth['forgot-password'].page);
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onLogin)} className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<FormControl name="username" control={control} label={t(Auth.FORM_EMAIL_LABEL)}>
						{(field, hasError) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.FORM_EMAIL_PLACEHOLDER)}
								error={hasError}
							/>
						)}
					</FormControl>
				</div>

				<div className={styles['input-wrapper']}>
					<PasswordInput
						name="password"
						error={errors.password?.message}
						label={t(Auth.FORM_PASSWORD_LABEL)}
						placeholder={t(Auth.FORM_PASSWORD_PLACEHOLDER)}
					/>
					<div className={styles['forgot-password-link']}>
						<Button variant="link" onClick={handeleForgotPassword}>
							{t(Auth.LOGIN_FORGOT_PASSWORD_LINK)}
						</Button>
					</div>
				</div>
				<Button
					type="submit"
					variant="primary"
					disabled={isLoading}
					className={styles['submit-button']}
				>
					{t(Auth.LOGIN_SUBMIT)}
				</Button>
			</form>
		</div>
	);
};
