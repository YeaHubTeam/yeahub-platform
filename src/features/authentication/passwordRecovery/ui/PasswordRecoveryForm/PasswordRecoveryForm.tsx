import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace, Auth } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { PasswordInput } from '@/shared/ui/PasswordInput';

import { useResetPasswordMutation } from '../../api/passwordRecoveryApi';
import { PasswordRecoveryFormValues } from '../../model/types/passwordRecoveryTypes';

import styles from './PasswordRecoveryForm.module.css';

export const PasswordRecoveryForm = () => {
	const [resetPassword] = useResetPasswordMutation();

	const location = useLocation();

	const urlParams = new URLSearchParams(location.search);
	const token = urlParams.get('token');

	const { t } = useTranslation(i18Namespace.auth);
	const {
		formState: { errors },
		handleSubmit,
	} = useFormContext<PasswordRecoveryFormValues>();

	const onClickResetPassword = async (data: PasswordRecoveryFormValues) => {
		if (token) {
			await resetPassword({
				password: data.password,
				passwordConfirm: data.confirmPassword,
				token: token,
			});
		}
	};

	return (
		<div>
			<div className={styles['input-wrapper']}>
				<PasswordInput
					name="password"
					error={errors.password?.message}
					label={t(Auth.FORM_PASSWORD_NEW_LABEL)}
					placeholder={t(Auth.FORM_PASSWORD_LABEL)}
				/>
			</div>
			<div className={styles['input-wrapper']}>
				<PasswordInput
					name="confirmPassword"
					error={errors.confirmPassword?.message}
					label={t(Auth.FORM_PASSWORD_NEW_REPEAT_LABEL)}
					placeholder={t(Auth.FORM_PASSWORD_LABEL)}
				/>
			</div>
			<Button
				variant="primary"
				className={styles['submit-button']}
				onClick={handleSubmit(onClickResetPassword)}
			>
				{t(Auth.PASSWORD_RECOVERY_SUBMIT)}
			</Button>
		</div>
	);
};
