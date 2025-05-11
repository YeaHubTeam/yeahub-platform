import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './FooterMain.module.css';

export const FooterMainSkeleton = () => {
	const { isMobile, isMobileS } = useScreenSize();

	return (
		<Flex className={styles['footer-main']}>
			<Flex className={styles['footer-logo']}>
				<Skeleton width={99} height={32} borderRadius={4} />
			</Flex>
			<Flex className={styles['footer-title']}>
				<Skeleton
					width={isMobileS ? '70%' : isMobile ? '50%' : '30%'}
					height={20}
					borderRadius="4px"
				/>
			</Flex>
			<Flex className={styles['footer-description']}>
				<Skeleton width="96%" height={isMobileS ? 54 : isMobile ? 36 : 18} borderRadius="4px" />
			</Flex>
		</Flex>
	);
};
