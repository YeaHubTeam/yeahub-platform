import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { REGISTRATION_CONSENT_LINK } from '@/shared/constants/consentAndTermsLinks';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormControl } from '@/shared/ui/FormControl';

import { SignUpFormValues, useRegisterMutation } from '@/entities/auth';

import styles from './RegisterForm.module.css';

type CheckBoxState = {
	CheckBox1: boolean;
	CheckBox2: boolean;
	CheckBox3: boolean;
};

export const RegisterForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [registrationMutation] = useRegisterMutation();
	const [isChecked, setIsChecked] = useState<CheckBoxState>({
		CheckBox1: false,
		CheckBox2: false,
		CheckBox3: false,
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext<SignUpFormValues>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onRegistration = async (data: SignUpFormValues) => {
		await registrationMutation(data);
	};

	const { t } = useI18nHelpers(i18Namespace.auth);

	const privacyPolicyParts = t(Auth.REGISTRATION_PRIVACY_POLICY_TEXT).split(
		/<processingLink>|<\/processingLink>/,
	);
	const offerAgreementParts = t(Auth.REGISTRATION_OFFER_AGREEMENT_TEXT).split(
		/<processingLink>|<\/processingLink>/,
	);

	const adConsentParts = t(Auth.REGISTRATION_AD_CONSENT_TEXT).split(
		/<processingLink>|<\/processingLink>/,
	);

	const handleConsentChange = (consentName: keyof CheckBoxState) => {
		setIsChecked((prevState) => ({
			...prevState,
			[consentName]: !prevState[consentName],
		}));
	};

	const isFormValid = (): boolean => {
		return Object.values(isChecked).every((checked) => checked);
	};

	return (
		<>
			<div className={styles['form-wrapper']}>
				<h1 className={styles.title}>{t('registration.title')}</h1>

				<div className={styles['input-wrapper']}>
					<FormControl name="firstName" control={control} label={t(Auth.REGISTRATION_FIRST_NAME)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.REGISTRATION_FIRST_NAME_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="lastName" control={control} label={t(Auth.REGISTRATION_LAST_NAME)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.REGISTRATION_LAST_NAME_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="email" control={control} label={t(Auth.REGISTRATION_EMAIL)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.REGISTRATION_EMAIL_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="password" control={control} label={t(Auth.REGISTRATION_PASSWORD)}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.REGISTRATION_PASSWORD_PLACEHOLDER)}
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
						label={t(Auth.REGISTRATION_REPEAT_PASSWORD)}
					>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Auth.REGISTRATION_REPEAT_PASSWORD_PLACEHOLDER)}
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
					disabled={!isFormValid()}
					onClick={handleSubmit(onRegistration)}
					variant="primary"
					className={styles['submit-button']}
				>
					{t(Auth.REGISTRATION_REGISTER_BUTTON)}
				</Button>
			</div>

			<div className={styles['consent-wrapper']}>
				<p>{t(Auth.REGISTRATION_CONSENT_TEXT)}</p>
				<div className={styles['consent-checkboxes']}>
					<Checkbox
						className={styles.checkbox}
						checked={isChecked.CheckBox1}
						onChange={() => handleConsentChange('CheckBox1')}
						label={
							<p>
								{privacyPolicyParts[0]}
								<a
									href={REGISTRATION_CONSENT_LINK}
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{privacyPolicyParts[1]}
								</a>
								{privacyPolicyParts[2]}
							</p>
						}
					/>
					<Checkbox
						className={styles.checkbox}
						checked={isChecked.CheckBox2}
						onChange={() => handleConsentChange('CheckBox2')}
						label={
							<p>
								{offerAgreementParts[0]}
								<a
									href={REGISTRATION_CONSENT_LINK}
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{offerAgreementParts[1]}
								</a>
								{offerAgreementParts[2]}
							</p>
						}
						style={{ paddingTop: '8px' }}
					/>
					<Checkbox
						className={styles.checkbox}
						checked={isChecked.CheckBox3}
						onChange={() => handleConsentChange('CheckBox3')}
						label={
							<p>
								{adConsentParts[0]}
								<a
									href={REGISTRATION_CONSENT_LINK}
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{adConsentParts[1]}
								</a>
								{adConsentParts[2]}
							</p>
						}
					/>
				</div>
			</div>
		</>
	);
};
