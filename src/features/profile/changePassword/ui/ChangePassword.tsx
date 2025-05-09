import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PasswordInput } from '@/shared/ui/PasswordInput';

import { getFullProfile } from '@/entities/profile';

import { useChangePasswordMutation } from '../api/changePasswordApi';
import { ChangePasswordFormValues } from '../model/types/changePasswordTypes';

import styles from './ChangePassword.module.css';

export const ChangePassword = () => {
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);
	const token = getFromLS(LS_ACCESS_TOKEN_KEY);
	const profile = useAppSelector(getFullProfile);
	const userId = profile?.id;
	const {
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useFormContext<ChangePasswordFormValues>();
	const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();

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
		<Card>
			<Flex direction="column" gap="12" className={styles['header-section']}>
				<h3 className={styles['title']}>{t(Profile.CHANGE_PASSWORD_TITLE)}</h3>
				<p className={styles['description']}>{t(Profile.CHANGE_PASSWORD_DESCRIPTION)}</p>
			</Flex>

			<form className={styles.form} onSubmit={handleSubmit(handleChangePassword)}>
				<Flex className={styles['flex-form']}>
					<div className={styles['input-wrapper']}>
						<PasswordInput
							name="password"
							error={errors.password?.message}
							label={t(Profile.CHANGE_PASSWORD_LABEL)}
							placeholder={t(Profile.CHANGE_PASSWORD_PLACEHOLDER)}
						/>
					</div>

					<div className={styles['input-wrapper']}>
						<PasswordInput
							name="passwordConfirm"
							error={errors.passwordConfirm?.message}
							label={t(Profile.CHANGE_PASSWORD_REPEAT_LABEL)}
							placeholder={t(Profile.CHANGE_PASSWORD_PLACEHOLDER)}
						/>
					</div>

					<Button
						size="large"
						type="submit"
						className={styles['submit-button']}
						disabled={!isValid || isChangePasswordLoading}
					>
						{t(Translation.SAVE, { ns: i18Namespace.translation })}
					</Button>
				</Flex>
			</form>
		</Card>
	);
};
