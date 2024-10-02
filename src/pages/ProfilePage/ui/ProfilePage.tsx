import { FC } from 'react';

import { useProfileQuery } from '@/entities/auth';
import { useGetProfileByIdQuery } from '@/entities/profile';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './ProfilePage.module.css';
import { ProfilePageSkeleton } from './ProfilePage.skeleton';

export const ProfilePage = () => {
	const { data } = useProfileQuery();

	const { data: profile, isLoading: profileLoading } = useGetProfileByIdQuery(
		data?.profiles[0].profileId as string,
	);
	const { data: profileSpecialization } = useGetSpecializationByIdQuery(
		data?.profiles[0].specializationId as number,
	);

	if (profileLoading) {
		return <ProfilePageSkeleton />;
	}

	return (
		profile && (
			<div className={styles['content']}>
				<div className={styles['main-content']}>
					<UserBlock profile={profile} profileSpecialization={profileSpecialization} />
					<InfoBlock description={profile?.description} />
					<SkillsBlock skillsList={profile?.profileSkills} />
				</div>
				<div className={styles['side-content-tmp']}></div>
			</div>
		)
	);
};

export default ProfilePage as FC;
