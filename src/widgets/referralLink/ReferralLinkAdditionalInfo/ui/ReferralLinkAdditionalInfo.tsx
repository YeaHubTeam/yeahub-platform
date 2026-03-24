import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import {
	type ReferralLink,
	ReferralLinkCount,
	ReferralLinkDate,
	ReferralLinkOwner,
	ReferralLinkSum,
} from '@/entities/referralLink';

import styles from './ReferralLinkAdditionalInfo.module.css';
interface ReferralLinkAdditionalInfoProps
	extends Pick<
		ReferralLink,
		'amountSum' | 'linkedCount' | 'createdAt' | 'updatedAt' | 'ownerUsername' | 'ownerId'
	> {}

export const ReferralLinkAdditionalInfo = ({
	amountSum,
	linkedCount,
	createdAt,
	updatedAt,
	ownerUsername,
	ownerId,
}: ReferralLinkAdditionalInfoProps) => {
	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="24">
				<ReferralLinkSum amountSum={amountSum} />
				<ReferralLinkCount count={linkedCount} />
				<ReferralLinkDate label="Дата создания:" date={createdAt} />
				<ReferralLinkDate label="Дата изменения:" date={updatedAt} />
				<ReferralLinkOwner ownerId={ownerId} ownerUsername={ownerUsername} />
			</Flex>
		</Card>
	);
};
