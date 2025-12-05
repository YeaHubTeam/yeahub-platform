import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import { FullProfile } from '@/entities/auth';
import { getIsEdit } from '@/entities/profile';
import { Specialization } from '@/entities/specialization';
import { UserEditButton } from '@/entities/user';

import { UserImageBlock } from '../UserImageBlock';
import { UserInfoBlock } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: FullProfile;
	profileSpecialization: Specialization | undefined;
}

export const UserBlock = ({ profile, profileSpecialization }: UserBlockProps) => {
	const isEdit = useAppSelector(getIsEdit);

	return (
		<Card withOutsideShadow>
			<div className={styles.card}>
				<div className={styles['user-data']}>
					<UserImageBlock avatar={profile.avatarUrl} />
					<UserInfoBlock profile={profile} profileSpecialization={profileSpecialization} />
				</div>
				{isEdit && <UserEditButton tab={'personal-information'} />}
			</div>
		</Card>
	);
};
