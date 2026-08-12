import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { DeleteFeatureFlagButtonSkeleton } from '@/features/featureFlag/deleteFeatureFlag';

import { AdditionalInfoSkeleton } from '@/widgets/Collection';

import styles from './FeatureFlagDetailsPageContent.module.css';

export const FeatureFlagDetailsPageContentSkeleton = () => {
	return (
		<>
			<Flex justify="between" align="center" className={styles['header-skeleton']}>
				<BackButtonSkeleton />
				<Flex gap="16">
					<DeleteFeatureFlagButtonSkeleton />
					<ButtonSkeleton width={94} />
				</Flex>
			</Flex>
			<Flex gap="20" align="start" justify="between">
				<CardSkeleton withOutsideShadow className={styles['main-card']}>
					<Flex direction="column" gap="20" maxWidth>
						<TextSkeleton variant="body6" width="100%" />
						<TextSkeleton variant="body3" width="100%" />
					</Flex>
				</CardSkeleton>
				<AdditionalInfoSkeleton
					showAuthorInfo={false}
					className={styles['additional-info-card-skeleton']}
				/>
			</Flex>
		</>
	);
};
