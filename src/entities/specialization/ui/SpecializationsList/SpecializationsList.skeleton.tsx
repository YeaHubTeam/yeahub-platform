import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SpecializationsList.module.css';

export const SpecializationsListSkeleton = () => {
	return (
		<Flex direction="column" gap="8">
			<TextSkeleton variant="body3" width={150} />
			<ul className={styles['param-wrapper']}>
				{[...Array(5)].map((_, index) => (
					<ChipSkeleton key={index} />
				))}
			</ul>{' '}
		</Flex>
	);
};
