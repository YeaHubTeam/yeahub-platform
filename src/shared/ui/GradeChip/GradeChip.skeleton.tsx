import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './GradeChip.module.css';

export const GradeChipSkeleton = () => {
	return (
		<Flex align="center" gap="12" componentType="li" className={styles.param}>
			<TextSkeleton variant="body2-accent" width={50} />
			<TextSkeleton variant="body2-strong" width={16} />
		</Flex>
	);
};
