import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceAdditionalInfoDrawerSkeleton } from '../ResourceAdditionalInfoDrawer/ResourceAdditionalInfoDrawer.skeleton';

import styles from './ResourceHeader.module.css';

export const ResourceHeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" gap="8" className={styles.header}>
			<Flex gap="10" wrap="nowrap" justify="between">
				<TextSkeleton variant="body6" isMainTitle width={150} />
				{(isMobile || isTablet) && <ResourceAdditionalInfoDrawerSkeleton />}
			</Flex>
			<TextSkeleton variant="body3" width={150} />
		</Flex>
	);
};
