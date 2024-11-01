import { useEffect } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import { UserVerifyed, UserVerifySending, UserVerifyWaiting } from '@/entities/profile';

import styles from './SettingsProfile.module.css';

export const SettingsProfile = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const upperCaseFirstLetter =
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).charAt(0).toUpperCase() +
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).slice(1);

	const { data: profile, refetch } = useProfileQuery();

	const verifyedUser = profile?.isEmailVerified;

	const email = profile?.email || '';

	useEffect(() => {
		if (profile && !profile.isEmailVerified) {
			const interval = setInterval(() => refetch(), 5000);

			return () => clearInterval(interval);
		}
	}, [profile, refetch]);

	return (
		<div className={styles.wrapper}>
			<Card className={styles.card}>
				<div className={styles['card-wrapper']}>
					<div className={styles['card-content']}>
						{verifyedUser && profile?.emailVerificationToken !== null ? (
							<UserVerifyed />
						) : profile?.emailVerificationToken !== null ? (
							<UserVerifyWaiting upperCaseFirstLetter={upperCaseFirstLetter} email={email} />
						) : (
							<UserVerifySending upperCaseFirstLetter={upperCaseFirstLetter} {...profile} />
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};
