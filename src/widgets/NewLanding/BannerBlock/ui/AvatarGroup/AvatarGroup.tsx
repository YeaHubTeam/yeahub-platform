import cn from 'classnames';

import avatar1 from '@/shared/assets/images/newLanding/avatar1.avif';
import avatar2 from '@/shared/assets/images/newLanding/avatar2.avif';
import avatar3 from '@/shared/assets/images/newLanding/avatar3.avif';
import avatar4 from '@/shared/assets/images/newLanding/avatar4.avif';
import { Flex } from '@/shared/ui/Flex';

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
			<Flex align="center" justify="center" className={cn(styles.avatar, styles.count)}>
				1k+
			</Flex>
		</Flex>
	);
};
