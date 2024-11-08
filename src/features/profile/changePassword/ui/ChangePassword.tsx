import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Icon, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import styles from './ChangePassword.module.css';

export interface ChangePasswordFormProps {
	newPassword: string;
	confirmPassword: string;
}

export const ChangePassword = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const [isPasswordHidden, setIsPasswordHidden] = useState(false);

	const {
		control,
		formState: { errors },
	} = useFormContext<ChangePasswordFormProps>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	return (
		<>
			<Flex direction="column" gap="12" className={styles['header-section']}>
				<h3 className={styles['title']}>{t(Profile.PROFILE_CHANGE_PASSWORD_TITLE)}</h3>
				<p className={styles['description']}>{t(Profile.PROFILE_CHANGE_PASSWORD_DESCRIPTION)}</p>
			</Flex>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className={styles.form}
			>
				<Flex gap="20">
					<div className={styles['input-wrapper']}>
						<FormControl
							name="newPassword"
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
												errors.newPassword?.message
													? '--palette-ui-red-700'
													: '--palette-ui-black-300'
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

					<Button theme="primary" type="submit" className={styles['submit-button']}>
						{t(Profile.PROFILE_CHANGE_PASSWORD_BUTTON)}
					</Button>
				</Flex>
			</form>
		</>
	);
};
