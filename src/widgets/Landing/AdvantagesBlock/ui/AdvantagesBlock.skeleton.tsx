import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AdvantagesBlock.module.css';
import { AdvantagesListSkeleton } from './AdvantagesList/AdvantagesList.skeleton';

export const AdvantagesBlockSkeleton = () => {
	return (
		<>
			<Flex gap="20" direction="column">
				<Flex direction="column" gap="8" className={styles.process}>
					<TextSkeleton width="100%" variant="head2" />
					<TextSkeleton width="100%" variant="body3" />
				</Flex>
				<AdvantagesListSkeleton />
			</Flex>
		</>
	);
};
