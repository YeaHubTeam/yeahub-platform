import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { GuruSocialsListSkeleton } from '../GuruSocialsList/GuruSocialsList.skeleton';

import styles from './GurusItem.module.css';

export const GurusItemSkeleton = () => {
	return (
		<Flex componentType="li" direction="column" gap="12" className={styles.border}>
			<Flex gap="8" align={'center'}>
				<Skeleton className={styles['img-wrapper']} />
				<Flex gap="4" direction="column">
					<TextSkeleton variant="body3-accent" color="black-800" width={150} />
					<TextSkeleton variant="body3-accent" color="black-500" width={150} />
				</Flex>
			</Flex>
			<TextSkeleton variant="body3-accent" color="black-800" width={300} />
			<TextSkeleton variant="body3-accent" color="black-800" width={300} />
			<GuruSocialsListSkeleton />
		</Flex>
	);
};
