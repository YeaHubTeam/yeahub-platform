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
				<Flex wrap="nowrap">
					<TextSkeleton variant={'body2'} width={110} />
					<TextSkeleton variant="body3-accent" width={150} />
				</Flex>

				<Flex align="center" wrap="nowrap">
					<TextSkeleton variant={'body2'} width={110} />
					<ChipSkeleton active />
				</Flex>

				<Flex wrap="nowrap">
					<TextSkeleton variant={'body2'} width={110} />
					<TextSkeleton variant={'body2-accent'} width={150} />
				</Flex>
			</Flex>
		</Flex>
	);
};
