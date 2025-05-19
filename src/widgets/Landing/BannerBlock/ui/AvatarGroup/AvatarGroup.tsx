import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import avatar1 from '@/widgets/Landing/BannerBlock/model/assets/avatar1.avif';
import avatar2 from '@/widgets/Landing/BannerBlock/model/assets/avatar2.avif';
import avatar3 from '@/widgets/Landing/BannerBlock/model/assets/avatar3.avif';
import avatar4 from '@/widgets/Landing/BannerBlock/model/assets/avatar4.avif';

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
