import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { FullProfile } from '@/entities/auth';
import { getIsEdit } from '@/entities/profile';
import { Specialization } from '@/entities/specialization';
import { UserRolesList } from '@/entities/user';
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
	const userRoles = profile.userRoles;

	return (
		<Card withOutsideShadow>
			<div className={styles.card}>
				<div className={styles['user-data']}>
					<UserImageBlock avatar={profile.avatarUrl} />
					<UserInfoBlock profile={profile} profileSpecialization={profileSpecialization} />
					<UserRolesList userRoles={userRoles} />
				</div>
				{isEdit && <UserEditButton tab={'personal-information'} />}
			</div>
		</Card>
	);
};
