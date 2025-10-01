import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { TelegramUnlinkButton } from '@/features/authentication/telegramUnlink';

import styles from './TelegramVerifiedSection.module.css';

type TelegramVerifiedProps = {
	userName: string | null;
};

export const TelegramVerifiedSection = ({ userName }: TelegramVerifiedProps) => {
	const { t } = useTranslation(i18Namespace.profile);
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.card}>
			<Flex direction="column" gap="12">
				<Flex direction={isMobileS ? 'column-reverse' : 'row'} justify="between" gap="8">
					<Text variant={isMobileS ? 'body5-accent' : 'head3'}>
						{t(Profile.TELEGRAM_VERIFIED_TITLE)}
					</Text>
					<StatusChip
						status={{
							text: t(Profile.TELEGRAM_VERIFIED_STATUS),
							variant: 'green',
						}}
					/>
				</Flex>
				<Text variant="body3" className={styles.description}>
					{t(Profile.TELEGRAM_VERIFIED_DESCRIPTION)}
				</Text>
				<Flex align="center" gap="8">
					<Icon icon="telegramWithBackground" color="purple-700" size={28} />
					<Text variant="body5-accent">@{userName}</Text>
				</Flex>
			</Flex>
			<TelegramUnlinkButton />
		</Card>
	);
};
