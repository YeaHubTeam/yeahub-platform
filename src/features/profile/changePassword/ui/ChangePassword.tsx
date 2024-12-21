import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { getFullProfile } from '@/entities/profile';

import { useChangePasswordMutation } from '../api/changePasswordApi';
import { ChangePasswordFormValues } from '../model/types/changePasswordTypes';

import styles from './ChangePassword.module.css';

export const ChangePassword = () => {
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);
	const token = getFromLS(LS_ACCESS_TOKEN_KEY);
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const profile = useAppSelector(getFullProfile);
	const userId = profile?.id;
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useFormContext<ChangePasswordFormValues>();
	const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();
	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};
	const handleChangePassword = async (values: ChangePasswordFormValues) => {
		const fetchPasswordData = { ...values, token: token as string };
		if (userId) {
			await changePassword({
				id: userId,
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
				<h3 className={styles['title']}>{t(Profile.CHANGE_PASSWORD_TITLE)}</h3>
				<p className={styles['description']}>{t(Profile.CHANGE_PASSWORD_DESCRIPTION)}</p>
			</Flex>

			<form className={styles.form} onSubmit={handleSubmit(handleChangePassword)}>
				<Flex className={styles['flex-form']}>
					<div className={styles['input-wrapper']}>
						<FormControl name="password" control={control} label={t(Profile.CHANGE_PASSWORD_LABEL)}>
							{(field) => (
								<Input
									{...field}
									className={styles.input}
									placeholder={t(Profile.CHANGE_PASSWORD_PLACEHOLDER)}
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
							label={t(Profile.CHANGE_PASSWORD_REPEAT_LABEL)}
						>
							{(field) => (
								<Input
									{...field}
									className={styles.input}
									placeholder={t(Profile.CHANGE_PASSWORD_PLACEHOLDER)}
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
						type="submit"
						className={styles['submit-button']}
						disabled={!isValid || isChangePasswordLoading}
					>
						{t(Translation.SAVE, { ns: i18Namespace.translation })}
					</Button>
				</Flex>
			</form>
		</>
	);
};
