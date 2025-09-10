import { useScreenSize } from '@/shared/hooks';
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
			align="center"
			direction={isMobile ? 'column' : 'row'}
		>
			<Flex direction="column" gap="12" justify="center" className={styles['intro-text-wrapper']}>
				<TextSkeleton width={isMobile ? 300 : 600} variant={isMobile ? 'head5' : 'head3'} />
				<TextSkeleton
					variant="body3"
					className={styles['intro-description']}
					width={isMobile ? 300 : 600}
				/>
			</Flex>
			<Skeleton className={styles['img-wrapper']} />
		</Flex>
	);
};
