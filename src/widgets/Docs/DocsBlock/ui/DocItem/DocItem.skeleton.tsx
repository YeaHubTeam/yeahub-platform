import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './DocItem.module.css';

export const DocItemSkeleton = () => {
	return (
		<Flex className={styles['doc-item']} justify="between" align="center">
			<TextSkeleton variant="body3-accent" width="100%" />
			<div className={styles['doc-link']}>
				<ButtonSkeleton variant="link-purple" width={70} />
			</div>
		</Flex>
	);
};
