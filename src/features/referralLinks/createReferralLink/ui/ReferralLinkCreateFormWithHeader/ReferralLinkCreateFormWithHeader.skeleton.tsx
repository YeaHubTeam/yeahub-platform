import { BackButton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { ReferralLinkCreateFormCardSkeleton } from '../ReferralLinkCreateFormCard/ReferralLinkCreateFormCard.skeleton';

import styles from './ReferralLinkCreateFormWithHeader.module.css';

export const ReferralLinkCreateFormWithHeaderSkeleton = () => {
	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<ButtonSkeleton width={147} />
			</Flex>
			<ReferralLinkCreateFormCardSkeleton />
		</Flex>
	);
};
