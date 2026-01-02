import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import { TelegramUnlinkButton } from '../TelegramUnlinkButton/TelegramUnlinkButton';

import styles from './TelegramVerifiedSection.module.css';

export const TelegramVerifiedSection = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { isMobileS } = useScreenSize();

	const { telegramUsername } = useAppSelector(getFullProfile);

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
					<Text variant="body5-accent">@{telegramUsername}</Text>
				</Flex>
			</Flex>
			<TelegramUnlinkButton />
		</Card>
	);
};
