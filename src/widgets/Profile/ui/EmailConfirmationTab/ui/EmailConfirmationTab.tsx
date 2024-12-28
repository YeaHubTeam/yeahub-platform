import { useEffect } from 'react';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import { getProfileIsEmailSent, UserVerifyed } from '@/entities/profile';

import { ConfirmationEmail } from '@/features/profile/confirmationEmail';

import styles from './EmailConfirmationTab.module.css';

export const EmailConfirmationTab = () => {
	const isLetterSended = useAppSelector(getProfileIsEmailSent);

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
				<ConfirmationEmail email={email} isLetterSended={isLetterSended} />
			)}
		</Flex>
	);
};
