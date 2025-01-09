import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './IncompleteProfileStub.module.css';

export const IncompleteProfileStubSkeleton = () => {
	return (
		<CardSkeleton className={styles.card} title="title">
			<Flex direction="column" gap="16">
				<TextSkeleton variant="body2-accent" width="100%" />
				<ButtonSkeleton className={styles.button} size="L" />
			</Flex>
		</CardSkeleton>
	);
};
