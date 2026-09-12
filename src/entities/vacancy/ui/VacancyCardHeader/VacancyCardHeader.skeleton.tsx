import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './VacancyCardHeader.module.css';

export const VacancyCardHeaderSkeleton = () => {
	return (
		<Flex gap="12" wrap="wrap" justify="between">
			<Flex gap="12" align="end">
				<ImageWithWrapperSkeleton className={styles['image-wrapper']} />
				<TextSkeleton variant="body3" width={200} />
			</Flex>
			<StatusChipSkeleton />
			<TextSkeleton variant="body6" className={styles.title} width="100%" />
		</Flex>
	);
};
