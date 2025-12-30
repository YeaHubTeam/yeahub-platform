import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import { getProfileIsEmailSent, UserVerified } from '@/entities/profile';

import { ConfirmationEmail } from '@/features/profile/confirmationEmail';

import styles from './EmailVerification.module.css';

const POLLING_INTERVAL = 5000;
const MAX_POLLING_ATTEMPTS = 60;

export const EmailVerification = () => {
	const isLetterSent = useAppSelector(getProfileIsEmailSent);
	const { data: profile, refetch } = useProfileQuery();
	const pollingAttemptsRef = useRef(0);

	const isEmailVerified = profile?.isVerified;
	const email = profile?.email ?? '';

	useEffect(() => {
		if (isLetterSent) {
			pollingAttemptsRef.current = 0;
		}
	}, [isLetterSent]);

	useEffect(() => {
		if (isLetterSent && !isEmailVerified && pollingAttemptsRef.current < MAX_POLLING_ATTEMPTS) {
			const interval = setInterval(async () => {
				try {
					await refetch();
					pollingAttemptsRef.current += 1;

					if (pollingAttemptsRef.current >= MAX_POLLING_ATTEMPTS) {
						clearInterval(interval);
					}
				} catch (error) {
					clearInterval(interval);
					// eslint-disable-next-line no-console
					console.error('Error during email verification polling:', error);
				}
			}, POLLING_INTERVAL);

			return () => clearInterval(interval);
		}
	}, [isLetterSent, isEmailVerified, refetch]);

	return (
		<Card>
			<Flex direction="column" className={styles.wrapper}>
				{isEmailVerified ? (
					<UserVerified />
				) : (
					<ConfirmationEmail email={email} isLetterSent={isLetterSent} />
				)}
			</Flex>
		</Card>
	);
};
