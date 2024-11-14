import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Button, Input, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { FormControl } from '@/shared/ui/FormControl';

import { useResetPasswordMutation } from '../../api/passwordRecoveryApi';
import { PasswordRecoveryFormValues } from '../../model/types/passwordRecoveryTypes';

import styles from './PasswordRecoveryForm.module.css';

export const PasswordRecoveryForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(false);
	const [resetPassword] = useResetPasswordMutation();

	const location = useLocation();

	const urlParams = new URLSearchParams(location.search);
	const token = urlParams.get('token');

	const { t } = useI18nHelpers(i18Namespace.auth);
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useFormContext<PasswordRecoveryFormValues>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const handleShowConfirmPassword = () => {
		setIsConfirmPasswordHidden((prev) => !prev);
	};

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
				<FormControl
					name="password"
					control={control}
					label={t(Auth.PASSWORD_RECOVERY_ENTER_PASSWORD)}
				>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.PASSWORD_RECOVERY_PLACEHOLDER)}
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
			</div>
			<div className={styles['input-wrapper']}>
				<FormControl
					name="confirmPassword"
					control={control}
					label={t(Auth.PASSWORD_RECOVERY_REPEAT_PASSWORD)}
				>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.PASSWORD_RECOVERY_PLACEHOLDER)}
							type={isConfirmPasswordHidden ? 'text' : 'password'}
							suffix={
								<Icon
									onClick={handleShowConfirmPassword}
									icon="password"
									arg={isConfirmPasswordHidden}
									size={24}
									color={
										errors.confirmPassword?.message
											? '--palette-ui-red-700'
											: '--palette-ui-black-300'
									}
								/>
							}
						/>
					)}
				</FormControl>
			</div>
			<Button
				theme="primary"
				className={styles['submit-button']}
				onClick={handleSubmit(onClickResetPassword)}
			>
				{t(Auth.PASSWORD_RECOVERY_SAVE)}
			</Button>
		</div>
	);
};
