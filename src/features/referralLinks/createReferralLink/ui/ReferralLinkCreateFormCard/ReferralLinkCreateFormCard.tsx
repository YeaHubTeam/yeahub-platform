import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getUserId } from '@/entities/profile';

import { ReferralLinkForm } from '../ReferralLinkForm/ReferralLinkForm';

import styles from './ReferralLinkCreateFormCard.module.css';

export const ReferralLinkCreateFormCard = () => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const userId = useAppSelector(getUserId);

	return (
		<Card className={styles.content}>
			<Flex direction="column" gap="28">
				<Text variant="body5-strong" color="black-900">
					{t(Marketplace.ADD_REF_CODE__REQUEST_LINK)}
				</Text>
				<ReferralLinkForm userId={userId} />
			</Flex>
		</Card>
	);
};
