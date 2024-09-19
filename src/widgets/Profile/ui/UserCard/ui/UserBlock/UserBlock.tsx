import { Card } from '@/shared/ui/Card';

import { Profile } from '@/entities/profile';

import { UserImageBlock } from '../UserImageBlock';
import { UserInfoBlock } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: Profile;
}

export const UserBlock = ({ profile }: UserBlockProps) => {
	return (
		<Card>
			<div className={styles.card}>
				<UserImageBlock user={profile?.user} />
				<UserInfoBlock profile={profile} />
			</div>
		</Card>
	);
};
