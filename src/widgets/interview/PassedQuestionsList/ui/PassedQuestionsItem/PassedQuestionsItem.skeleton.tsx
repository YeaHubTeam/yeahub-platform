import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PassedQuestionsItem.module.css';

export const PassedQuestionsItemSkeleton = () => {
	return (
		<li className={classNames(styles.item, styles.link)}>
			<ImageWithWrapperSkeleton className={styles.img} />
			<Flex direction="column" gap="8" maxWidth>
				<TextSkeleton variant="body4" width="100%" />
				<Skeleton width={130} height={42} borderRadius={12} />
			</Flex>
		</li>
	);
};
