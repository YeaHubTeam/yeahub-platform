import { Card } from '@/shared/ui/Card';

import { FullProfile } from '@/entities/auth';
import { Specialization } from '@/entities/specialization';

import { StatusLabel } from '../../../StatusLabel/StatusLabel';
import { UserEditButton } from '../UserEditButton';
import { UserImageBlock } from '../UserImageBlock';
import { UserInfoBlock } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: FullProfile;
	profileSpecialization: Specialization | undefined;
}

export const UserBlock = ({ profile, profileSpecialization }: UserBlockProps) => {
	return (
		<Card withOutsideShadow>
			<div className={styles.card}>
				<div className={styles['user-data']}>
					<UserImageBlock avatar={profile.avatarUrl} />
					<UserInfoBlock profile={profile} profileSpecialization={profileSpecialization} />
					<StatusLabel user={profile} />
				</div>
				<UserEditButton />
			</div>
		</Card>
	);
};
