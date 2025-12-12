import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import { avatar1, avatar2, avatar3, avatar4 } from '../../model/assets';

import styles from './AvatarGroup.module.css';

export const AvatarGroup = () => {
	const avatars = [avatar1, avatar2, avatar3, avatar4];

	return (
		<Flex className={styles['avatar-group']}>
			{avatars.map((src, index) => (
				<Flex key={index} className={styles.avatar}>
					<img src={src} alt={`Avatar ${index}`} />
				</Flex>
			))}
			<Flex align="center" justify="center" className={classNames(styles.avatar, styles.count)}>
				1k+
			</Flex>
		</Flex>
	);
};
