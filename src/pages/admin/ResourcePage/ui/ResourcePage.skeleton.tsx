import { useScreenSize } from '@/shared/hooks';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ResourceAdditionalInfoSkeleton } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceBodySkeleton } from '@/widgets/resources/ResourceBody';
import { ResourceHeaderSkeleton } from '@/widgets/resources/ResourceHeader';

import styles from './ResourcePage.module.css';

export const ResourcePageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeaderSkeleton />
			<Flex gap="20">
				<CardSkeleton withOutsideShadow className={styles.main}>
					<Flex maxWidth direction="column" gap="20">
						<ResourceHeaderSkeleton />
						<ResourceBodySkeleton />
					</Flex>
				</CardSkeleton>

				{!isMobile && !isTablet && <ResourceAdditionalInfoSkeleton />}
			</Flex>
		</>
	);
};
