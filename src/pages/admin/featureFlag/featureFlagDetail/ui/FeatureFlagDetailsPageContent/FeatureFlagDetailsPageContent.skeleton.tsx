import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { SwitchSkeleton } from '@/shared/ui/Switch';
import { TextSkeleton } from '@/shared/ui/Text';

import { DeleteFeatureFlagButtonSkeleton } from '@/features/featureFlag/deleteFeatureFlag';

import styles from './FeatureFlagDetailsPageContent.module.css';

export const FeatureFlagDetailsPageContentSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<Flex gap="16">
					<DeleteFeatureFlagButtonSkeleton />
					<ButtonSkeleton width={182} />
				</Flex>
			</BackHeaderSkeleton>
			<Flex gap="20" align="start" justify="between">
				<CardSkeleton withOutsideShadow className={styles['main-card']}>
					<Flex direction="column" gap="20" maxWidth>
						<TextSkeleton variant="body6" width="100%" />
						<TextSkeleton variant="body3" width="100%" />
					</Flex>
				</CardSkeleton>
				<CardSkeleton withOutsideShadow className={styles['additional-card']}>
					<Flex direction="column" gap="16">
						<Flex align="start" direction="column" gap="16">
							<TextSkeleton variant="body1" width={30} />
							<StatusChipSkeleton />
						</Flex>
						<BaseFilterSectionSkeleton length={1} width={60} gap="16" />
						<Flex align="start" direction="column" gap="16">
							<TextSkeleton variant="body1" width={42} />
							<SwitchSkeleton />
						</Flex>
						<BaseFilterSectionSkeleton length={1} width={104} gap="16" />
						<BaseFilterSectionSkeleton length={1} width={104} gap="16" />
					</Flex>
				</CardSkeleton>
			</Flex>
		</>
	);
};
