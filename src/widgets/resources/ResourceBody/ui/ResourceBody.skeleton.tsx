import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ResourceBody.module.css';

export const ResourceBodySkeleton = () => {
	return (
		<Flex className={styles['resource-body']} maxWidth>
			<ImageWithWrapperSkeleton className={styles['image-wrapper']} />

			<Flex direction="column" align="start" gap="20">
				<Flex wrap="nowrap" gap="20">
					<TextSkeleton variant="body2" width={80} />
					<TextSkeleton variant="body3-accent" width={100} />
				</Flex>

				<Flex wrap="nowrap" gap="20" align="center">
					<TextSkeleton variant="body2" width={80} />
					<ChipSkeleton active variant="big" label="..." withText={80} />
				</Flex>

				<Flex wrap="nowrap" gap="20">
					<TextSkeleton variant="body2" width={80} />
					<TextSkeleton variant="body2-accent" width={100} />
				</Flex>
			</Flex>
		</Flex>
	);
};
