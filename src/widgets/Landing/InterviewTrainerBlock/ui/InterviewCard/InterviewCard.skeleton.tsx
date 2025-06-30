import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './InterviewCard.module.css';

export const InterviewCardSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();
	return (
		<Flex
			gap="14"
			direction={isMobile ? 'column' : 'row'}
			align={isMobile ? 'center' : 'normal'}
			className={styles.card}
		>
			<Skeleton
				height={isTablet ? 254 : isMobile ? 233 : 'auto'}
				className={styles['image-wrapper']}
			/>

			<Flex gap="16" direction="column" className={styles['card-text']}>
				<IconSkeleton size={32} className={styles['text-icon']} />
				<TextSkeleton width={'100%'} variant="body3" />
				<ButtonSkeleton />
			</Flex>
		</Flex>
	);
};
