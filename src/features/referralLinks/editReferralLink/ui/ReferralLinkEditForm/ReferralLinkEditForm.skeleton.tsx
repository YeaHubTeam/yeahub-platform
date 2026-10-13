import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ReferralLinkFormSkeleton } from '@/entities/referralLink';

import { ReferralLinkEditFormHeaderSkeleton } from '../ReferralLinkEditFormHeader/ReferralLinkEditFormHeader.skeleton';

import styles from './ReferralLinkEditForm.module.css';

export const ReferralLinkEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column">
			<ReferralLinkEditFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<Flex direction="column" gap="28">
					<TextSkeleton width={340} variant="body5-strong" color="black-900" />
					<ReferralLinkFormSkeleton />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
