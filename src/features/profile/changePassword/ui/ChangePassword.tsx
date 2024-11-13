import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { useProfileQuery } from '@/entities/auth';

import { useChangePasswordMutation } from '../api/changePasswordApi';

import styles from './ChangePassword.module.css';

export interface ChangePasswordFormProps {
	password: string;
	passwordConfirm: string;
}

export const ChangePassword = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const token = localStorage.getItem('accessToken');
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const { data: profile } = useProfileQuery();
	const {
		control,
		formState: { errors, isValid },
		getValues,
		handleSubmit,
		reset,
	} = useFormContext<ChangePasswordFormProps>();
	const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();
	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};
	const handleChangePassword = () => {
		const values = getValues();
		const fetchPasswordData = { ...values, token: token as string };
		if (profile) {
			changePassword({
				id: profile.id,
				passwordObject: fetchPasswordData,
			}).then(() =>
				reset({
					password: '',
					passwordConfirm: '',
				}),
			);
		}
	};

	return (
		<>
			<Flex direction="column" gap="12" className={styles['header-section']}>
				<h3 className={styles['title']}>{t(Profile.PROFILE_CHANGE_PASSWORD_TITLE)}</h3>
				<p className={styles['description']}>{t(Profile.PROFILE_CHANGE_PASSWORD_DESCRIPTION)}</p>
			</Flex>

			<div className={styles.form}>
				<Flex className={styles['flex-form']}>
					<div className={styles['input-wrapper']}>
						<FormControl
							name="password"
							control={control}
							label={t(Profile.PROFILE_CHANGE_PASSWORD_ENTER_NEW_PASSWORD)}
						>
							{(field) => (
								<Input
									{...field}
									className={styles.input}
									placeholder={t(Profile.PROFILE_CHANGE_PASSWORD_PLACEHOLDERT)}
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
					</div>

					<div className={styles['input-wrapper']}>
						<FormControl
							name="passwordConfirm"
							control={control}
							label={t(Profile.PROFILE_CHANGE_PASSWORD_REPEAT_PASSWORD)}
						>
							{(field) => (
								<Input
									{...field}
									className={styles.input}
									placeholder={t(Profile.PROFILE_CHANGE_PASSWORD_PLACEHOLDERT)}
									type={isPasswordHidden ? 'text' : 'password'}
									suffix={
										<Icon
											className={styles.icon}
											onClick={handleShowPassword}
											icon="password"
											arg={isPasswordHidden}
											size={24}
											color={
												errors.passwordConfirm?.message
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
						className={styles['submit-button']}
						disabled={!isValid || isChangePasswordLoading}
						onClick={handleSubmit(handleChangePassword)}
					>
						{t(Profile.PROFILE_CHANGE_PASSWORD_BUTTON)}
					</Button>
				</Flex>
			</div>
		</>
	);
};
