/* eslint-disable import/no-internal-modules */
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import styles from './AuthAvatarFrame.module.css';

interface AvatarProps {
	link: string | null;
}

export const AuthAvatarFrame = ({ link }: AvatarProps) => {
	if (!link)
		return (
			<div className={styles.border}>
				<AvatarWithoutPhoto />
			</div>
		);
	return (
		<div className={styles.wrapper}>
			<img src={link} className={styles.avatar} alt="User Avatar" />
		</div>
	);
};
