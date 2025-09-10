import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './GuruSocialsList.module.css';

export const GuruSocialsListSkeleton = () => {
	return (
		<Flex gap="12">
			<Skeleton className={styles['img-social']} />
			<Skeleton className={styles['img-social']} />
			<Skeleton className={styles['img-social']} />
		</Flex>
	);
};
