import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import styles from './AvatarGroup.module.css';

export const AvatarGroupSkeleton = () => {
	return (
		<Flex className={styles['avatar-group']}>
			{Array.from({ length: 4 }).map((_, index) => (
				<Flex key={index} className={classNames(styles.avatar, styles['avatar-load'])} />
			))}
			<Flex
				align="center"
				justify="center"
				className={classNames(styles.avatar, styles['avatar-load'], styles.count)}
			>
				1k+
			</Flex>
		</Flex>
	);
};
