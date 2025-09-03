import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AdditionalBlock.module.css';

export const AdditionalBlockSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex className={styles['additional-block']}>
			{isMobileS && <Skeleton width={120} height={40} borderRadius={20} />}
			<Skeleton width={300} height={120} borderRadius={12} />
			<Skeleton width={300} height={120} borderRadius={12} />
			<Skeleton width={570} height={120} borderRadius={12} />
			<div className={styles.button}>
				<ButtonSkeleton />
			</div>
		</Flex>
	);
};
