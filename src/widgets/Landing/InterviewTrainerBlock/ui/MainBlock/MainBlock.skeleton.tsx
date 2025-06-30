import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MainBlock.module.css';

export const MainBlockSkeleton = () => {
	return (
		<Flex
			gap="20"
			direction="column"
			className={classNames(styles['main-block'], styles['main-block-load'])}
		>
			<Skeleton className={styles['image-wrapper']} />

			<TextSkeleton width="80%" variant="body3" color="white-900" />
		</Flex>
	);
};
