import { Card } from '@/shared/ui/Card';

import { GetProfileResponse } from '@/entities/auth';
import { Specialization } from '@/entities/specialization';

import { UserEditButton } from '../UserEditButton';
import { UserImageBlock } from '../UserImageBlock';
import { UserInfoBlock } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: GetProfileResponse;
	profileSpecialization: Specialization | undefined;
}

export const UserBlock = ({ profile, profileSpecialization }: UserBlockProps) => {
	return (
		<Card className={styles.container}>
			<div className={styles.card}>
				<div className={styles['user-data']}>
					<UserImageBlock profile={profile} />
					<UserInfoBlock profile={profile} profileSpecialization={profileSpecialization} />
				</div>
				<UserEditButton />
			</div>
		</Card>
	);
};
