import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ResourceBody.module.css';

export const ResourceBodySkeleton = () => {
	return (
		<Flex gap="20" className={styles['resource-body']} maxWidth>
			<ImageWithWrapperSkeleton className={styles['image-wrapper']} />

			<Flex direction="column" gap="12">
				<Flex gap="8" wrap="nowrap">
					<TextSkeleton variant={'body3'} width={150} />
					<TextSkeleton variant="body3-accent" width={150} />
				</Flex>

				<Flex gap="8" align="center" wrap="nowrap">
					<TextSkeleton variant={'body3'} width={150} />
					<ChipSkeleton />
				</Flex>

				<Flex gap="8" wrap="nowrap">
					<TextSkeleton variant={'body3'} width={150} />
					<TextSkeleton variant={'body3-accent'} width={150} />
				</Flex>
			</Flex>
		</Flex>
	);
};
