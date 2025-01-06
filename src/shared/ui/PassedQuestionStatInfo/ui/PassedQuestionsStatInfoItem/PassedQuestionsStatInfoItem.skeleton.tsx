import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PassedQuestionsStatInfoItem.module.css';

export const PassedQuestionsStatInfoItemSkeleton = () => {
	return (
		<Flex direction="column" gap="4" className={styles.stat}>
			<TextSkeleton variant="body1-accent" width={45} />
			<TextSkeleton variant="body1-accent" width={20} />
		</Flex>
	);
};
