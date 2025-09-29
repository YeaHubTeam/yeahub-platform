import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import { TelegramVerified } from '@/entities/profile';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ConfirmationTelegram } from '@/widgets/Profile';

import styles from './TelegramVerification.module.css';

export const TelegramVerification = () => {
	const { data: profile } = useProfileQuery();

	const isTelegramConnected = !!profile?.activeProfile?.telegram;

	return (
		<Card>
			<Flex direction="column" className={styles.wrapper}>
				{isTelegramConnected ? (
					<TelegramVerified userName={profile?.activeProfile?.telegram} />
				) : (
					<ConfirmationTelegram />
				)}
			</Flex>
		</Card>
	);
};
