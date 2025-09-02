import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ResourcesPage.module.css';

export const ResourcesPageSkeleton = () => {
	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<TextSkeleton width={200} variant="head2" />
		</Flex>
	);
};
