import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './OurMediaBanner.module.css';

export const OurMediaBannerSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex
			className={styles['intro']}
			justify="between"
			align={isMobile ? 'normal' : 'center'}
			direction={isMobile ? 'column' : 'row'}
		>
			<Flex direction="column" gap="12" justify="center" className={styles['intro-text-wrapper']}>
				<TextSkeleton width={150} variant={isMobile ? 'head5' : 'head3'} />
				<TextSkeleton className={styles['intro-description']} variant="body3" width={'100%'} />
				<TextSkeleton className={styles['intro-description']} variant="body3" width={'100%'} />
			</Flex>
			<Flex className={styles['books-img']}>
				<Skeleton width={206} />
			</Flex>
		</Flex>
	);
};
