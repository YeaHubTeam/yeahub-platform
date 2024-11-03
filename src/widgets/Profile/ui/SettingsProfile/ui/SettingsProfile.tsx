import { useEffect } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import { getUserIsEmailSent, UserVerifyed } from '@/entities/profile';

import { EmailFormValidation } from '@/features/settings/emailFormValidation';

import styles from './SettingsProfile.module.css';

export const SettingsProfile = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const isLetterSended = useAppSelector(getUserIsEmailSent);

	const upperCaseFirstLetter =
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).charAt(0).toUpperCase() +
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).slice(1);

	const { data: profile, refetch } = useProfileQuery();

	const isEmailVerified = profile?.isEmailVerified;

	const email = profile?.email ?? '';

	useEffect(() => {
		if (isLetterSended && !isEmailVerified) {
			const interval = setInterval(() => refetch(), 5000);

			return () => clearInterval(interval);
		}
	}, [profile, refetch]);

	return (
		<div className={styles.wrapper}>
			<Card className={styles.card}>
				<div className={styles['card-wrapper']}>
					<div className={styles['card-content']}>
						{isEmailVerified ? (
							<UserVerifyed />
						) : (
							<EmailFormValidation
								upperCaseFirstLetter={upperCaseFirstLetter}
								email={email}
								isLetterSended={isLetterSended}
							/>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};
