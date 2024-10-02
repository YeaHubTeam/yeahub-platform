import { Card } from '@/shared/ui/Card';

import { Profile } from '@/entities/profile';
import { Specialization } from '@/entities/specialization';

import { UserEditButton } from '../UserEditButton';
import { UserImageBlock } from '../UserImageBlock';
import { UserInfoBlock } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: Profile;
	profileSpecialization: Specialization | undefined;
}

export const UserBlock = ({ profile, profileSpecialization }: UserBlockProps) => {
	return (
		<Card>
			<div className={styles.card}>
				<UserImageBlock user={profile?.user} />
				<UserInfoBlock profile={profile} profileSpecialization={profileSpecialization} />
				<UserEditButton />
			</div>
		</Card>
	);
};
