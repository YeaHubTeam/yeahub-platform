import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import {
	AD_CONSENT_LINK,
	CONSENT_PROCESSING_LINK,
	OFFER_AGREEMENT_LINK,
	PRIVACY_POLICY_LINK,
} from '@/shared/constants/documents';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { SignUpFormValues, useRegisterMutation } from '@/entities/auth';

import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [registrationMutation] = useRegisterMutation();

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useFormContext<SignUpFormValues>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onRegistration = async (data: SignUpFormValues) => {
		await registrationMutation(data);
	};

	const { t } = useTranslation(i18Namespace.auth);

	const parseI18nText = (text: string) => text.split(/<processingLink>|<\/processingLink>/);

	const privacyPolicyParts = parseI18nText(t(Auth.REGISTRATION_PRIVACY_POLICY));
	const offerAgreementParts = parseI18nText(t(Auth.REGISTRATION_PRIVACY_OFFER_AGREEMENT));
	const adConsentParts = parseI18nText(t(Auth.REGISTRATION_PRIVACY_ADD_CONSENT));

	return (
		<form className={styles['form-wrapper']} onSubmit={handleSubmit(onRegistration)}>
			<h1>{t(Auth.REGISTRATION_TITLE)}</h1>

			<div className={styles['input-wrapper']}>
				<FormControl name="firstName" control={control} label={t(Auth.FORM_FIRSTNAME_LABEL)}>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.FORM_FIRSTNAME_PLACEHOLDER)}
						/>
					)}
				</FormControl>
			</div>
			<div className={styles['input-wrapper']}>
				<FormControl name="lastName" control={control} label={t(Auth.FORM_LASTNAME_LABEL)}>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.FORM_LASTNAME_PLACEHOLDER)}
						/>
					)}
				</FormControl>
			</div>
			<div className={styles['input-wrapper']}>
				<FormControl name="email" control={control} label={t(Auth.FORM_EMAIL_LABEL)}>
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
			</div>
			<div className={styles['input-wrapper']}>
				<FormControl
					name="passwordConfirmation"
					control={control}
					label={t(Auth.FORM_PASSWORD_REPEAT_LABEL)}
				>
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
									size={24}
									color={
										errors.passwordConfirmation?.message
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
				type="submit"
				disabled={!isValid}
				variant="primary"
				className={styles['submit-button']}
			>
				{t(Auth.REGISTRATION_SUBMIT)}
			</Button>
			<div className={styles['consent-wrapper']}>
				<p>{t(Auth.REGISTRATION_PRIVACY_TITLE)}</p>
				<FormControl name="privacyConsent" control={control}>
					{(field) => (
						<Checkbox
							{...field}
							label={
								<p>
									{privacyPolicyParts[0]}
									<a href={CONSENT_PROCESSING_LINK} target="_blank" rel="noopener noreferrer">
										{privacyPolicyParts[1]}
									</a>
									{privacyPolicyParts[2]}
									<a href={PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer">
										{privacyPolicyParts[3]}
									</a>
								</p>
							}
						/>
					)}
				</FormControl>
				<FormControl name="offerConsent" control={control} className={styles['form-control']}>
					{(field) => (
						<Checkbox
							{...field}
							label={
								<p>
									{offerAgreementParts[0]}
									<a href={OFFER_AGREEMENT_LINK} target="_blank" rel="noopener noreferrer">
										{offerAgreementParts[1]}
									</a>
									{offerAgreementParts[2]}
								</p>
							}
						/>
					)}
				</FormControl>
				<FormControl name="adConsent" control={control}>
					{(field) => (
						<Checkbox
							{...field}
							label={
								<p>
									{adConsentParts[0]}
									<a href={AD_CONSENT_LINK} target="_blank" rel="noopener noreferrer">
										{adConsentParts[1]}
									</a>
									{adConsentParts[2]}
								</p>
							}
						/>
					)}
				</FormControl>
			</div>
		</form>
	);
};
