import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FooterMain.module.css';

export const FooterMainSkeleton = () => {
	const { isMobile, isMobileS } = useScreenSize();

	return (
		<Flex className={styles['footer-main']}>
			<IconSkeleton className={styles['footer-logo']} />
			<TextSkeleton
				className={styles['footer-title']}
				width={isMobileS ? '70%' : isMobile ? '50%' : '30%'}
				variant={isMobileS ? 'body2' : isMobile ? 'body3' : 'body3-accent'}
			/>
			<TextSkeleton className={styles['footer-description']} width="96%" variant="body1" />
		</Flex>
	);
};
