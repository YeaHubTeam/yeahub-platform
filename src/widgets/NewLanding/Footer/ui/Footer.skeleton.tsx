import { Flex } from '@/shared/ui/Flex';

import styles from './Footer.module.css';
import { FooterMainSkeleton } from './FooterMain/FooterMain.skeleton';
import { FooterMetaSkeleton } from './FooterMeta/FooterMeta.skeleton';

export const FooterSkeleton = () => {
	return (
		<Flex className={styles.footer}>
			<Flex className={styles['footer-content']}>
				<FooterMainSkeleton />
				<FooterMetaSkeleton />
			</Flex>
		</Flex>
	);
};
