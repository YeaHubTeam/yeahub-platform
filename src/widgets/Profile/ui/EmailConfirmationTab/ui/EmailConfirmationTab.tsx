import { useEffect } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import { getProfileIsEmailSent, UserVerifyed } from '@/entities/profile';

import { ConfirmationEmail } from '@/features/profile/confirmationEmail';

import styles from './EmailConfirmationTab.module.css';

export const EmailConfirmationTab = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const isLetterSended = useAppSelector(getProfileIsEmailSent);

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
		<Flex direction="column" className={styles.wrapper}>
			{isEmailVerified ? (
				<UserVerifyed />
			) : (
				<ConfirmationEmail
					upperCaseFirstLetter={upperCaseFirstLetter}
					email={email}
					isLetterSended={isLetterSended}
				/>
			)}
		</Flex>
	);
};
