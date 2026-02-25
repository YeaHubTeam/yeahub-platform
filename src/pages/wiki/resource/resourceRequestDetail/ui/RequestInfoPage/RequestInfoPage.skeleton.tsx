import { useScreenSize } from '@/shared/libs';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ResourceAdditionalInfoSkeleton } from '@/entities/resource';

import { ResourceBodySkeleton } from '@/widgets/resources/ResourceBody';
import { ResourceHeaderSkeleton } from '@/widgets/resources/ResourceHeader';

import styles from './RequestInfoPage.module.css';

export const RequestInfoPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" align="start">
			<CardSkeleton withOutsideShadow className={styles.main}>
				<Flex direction="column" gap="20">
					<ResourceHeaderSkeleton />
					<ResourceBodySkeleton />
					<Flex gap="20">
						<ButtonSkeleton size="large" width={200} />
						<ButtonSkeleton size="large" width={200} />
					</Flex>
				</Flex>
			</CardSkeleton>

			{!isMobile && !isTablet && <ResourceAdditionalInfoSkeleton />}
		</Flex>
	);
};
