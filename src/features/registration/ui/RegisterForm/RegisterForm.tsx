import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { InputPhone } from '@/shared/ui/InputPhone';

import { SignUp, useRegisterMutation } from '@/entities/auth';

import styles from './RegisterForm.module.css';

interface RegistrationValidation extends SignUp {
	isChecked: boolean;
	passwordConfirmation: string;
}

export const RegisterForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [registrationMutation, { isLoading }] = useRegisterMutation();
	const { t } = useI18nHelpers(i18Namespace.auth);

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useFormContext<RegistrationValidation>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onRegistration = async (data: SignUp) => {
		await registrationMutation(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="name">
						{t(Auth.REGISTRATION_FIRST_NAME)}
					</label>
					<Input
						className={styles.input}
						{...register('firstName')}
						placeholder={t(Auth.REGISTRATION_FIRST_NAME_PLACEHOLDER)}
						hasError={!!errors.firstName?.message}
					/>
					{errors.firstName ? <div className={styles.error}>{errors.firstName.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="surname">
						{t(Auth.REGISTRATION_LAST_NAME)}
					</label>
					<Input
						className={styles.input}
						{...register('lastName')}
						placeholder={t(Auth.REGISTRATION_LAST_NAME_PLACEHOLDER)}
						hasError={!!errors.lastName?.message}
					/>
					{errors.lastName ? <div className={styles.error}>{errors.lastName.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="phone">
						{t(Auth.REGISTRATION_PHONE)}
					</label>
					<Controller
						name={'phone'}
						control={control}
						render={({ field }) => (
							<InputPhone fields={field} className={'registration'} hasError={!!errors.phone} />
						)}
					/>
					{errors.phone ? <div className={styles.error}>{errors.phone.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="email">
						{t(Auth.REGISTRATION_EMAIL)}
					</label>
					<Input
						className={styles.input}
						{...register('email')}
						placeholder={t(Auth.REGISTRATION_EMAIL_PLACEHOLDER)}
						hasError={!!errors.email?.message}
					/>
					{errors.email ? <div className={styles.error}>{errors.email.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="password">
						{t(Auth.REGISTRATION_PASSWORD)}
					</label>
					<Input
						className={styles.input}
						{...register('password')}
						placeholder={t(Auth.REGISTRATION_PASSWORD_PLACEHOLDER)}
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
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="repeatPassword">
						{t(Auth.REGISTRATION_REPEAT_PASSWORD)}
					</label>
					<Input
						className={styles.input}
						{...register('passwordConfirmation')}
						placeholder={t(Auth.REGISTRATION_REPEAT_PASSWORD_PLACEHOLDER)}
						type={isPasswordHidden ? 'text' : 'password'}
						hasError={!!errors.passwordConfirmation?.message}
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
					{errors.passwordConfirmation ? (
						<div className={styles.error}>{errors.passwordConfirmation.message}</div>
					) : null}
				</div>
			</div>
			<Button
				disabled={isLoading}
				onClick={handleSubmit(onRegistration)}
				theme="primary"
				className={styles['submit-button']}
			>
				{t(Auth.REGISTRATION_REGISTER_BUTTON)}
			</Button>
			<div className={styles['input-wrapper']}>
				<label className={styles['consent-wrapper']} htmlFor="isChecked">
					<input type="checkbox" className={styles.checkbox} {...register('isChecked')} />
					<span className={styles['consent-text']}>{t(Auth.REGISTRATION_CONSENT_TEXT)}</span>
				</label>
				{errors.isChecked ? <div className={styles.error}>{errors.isChecked.message}</div> : null}
			</div>
		</div>
	);
};
