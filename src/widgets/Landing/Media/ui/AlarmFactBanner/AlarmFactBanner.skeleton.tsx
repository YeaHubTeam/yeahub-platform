import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AlarmFactBanner.module.css';

export const AlarmFactBannerSkeleton = () => {
	const { isLargeScreen, isLaptop } = useScreenSize();

	return (
		<Flex className={styles['wrapper-skeleton']} gap="20" align="center">
			<Skeleton className={styles['img-wrapper']} />
			<TextSkeleton
				variant={isLargeScreen || isLaptop ? 'body6' : 'body5-accent'}
				width={isLaptop ? '90%' : '100%'}
			/>
		</Flex>
	);
};
