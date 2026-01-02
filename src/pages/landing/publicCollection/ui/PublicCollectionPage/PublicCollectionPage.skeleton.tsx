import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { CollectionNavigationButtonsSkeleton } from '@/features/collection/navigateCollection';

import {
	AdditionalInfoSkeleton,
	CollectionBodySkeleton,
	CollectionHeaderSkeleton,
} from '@/widgets/Collection';

import styles from './PublicCollectionPage.module.css';

export const PublicCollectionPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" align="start">
			<Flex gap="20" maxWidth>
				<Flex gap="20" direction="column" flex={1}>
					<CollectionHeaderSkeleton />
					<CollectionNavigationButtonsSkeleton width={160} />
					<CollectionBodySkeleton />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<AdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
