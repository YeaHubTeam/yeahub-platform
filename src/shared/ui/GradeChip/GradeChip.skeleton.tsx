import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { GradeChipSize, labelVariants } from './GradeChip';
import styles from './GradeChip.module.css';

interface GradeChipSkeletonProps {
	size?: GradeChipSize;
}

export const GradeChipSkeleton = ({ size = 'medium' }: GradeChipSkeletonProps) => {
	return (
		<Flex
			align="center"
			gap="12"
			componentType="li"
			className={`${styles['size-' + size]} ${styles.params}`}
		>
			<TextSkeleton variant={labelVariants[size]} width={50} />
			<TextSkeleton variant="body3" width={16} />
		</Flex>
	);
};
