import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './FooterLinks.module.css';

export const FooterLinksSkeleton = ({ className }: { className: string }) => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex className={className ? styles[className] : ''}>
			<Skeleton
				width={isMobileS ? 70 : 80}
				height={20}
				borderRadius="4px"
				className={styles['docs-link']}
			/>
			<Skeleton width={24} height={24} borderRadius="50%" className={styles['figma-link']} />
			<Skeleton width={24} height={24} borderRadius="50%" className={styles['github-link']} />
			<Skeleton width={24} height={24} borderRadius="50%" className={styles['telegram-link']} />
		</Flex>
	);
};
