import { FC } from 'react';

import { useProfileQuery } from '@/entities/auth';
import { useGetProfileByIdQuery } from '@/entities/profile';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
	const { data } = useProfileQuery();

	const { data: profile } = useGetProfileByIdQuery(data?.profiles[0].profileId as string);
	const { data: profileSpecialization } = useGetSpecializationByIdQuery(
		data?.profiles[0].specializationId as number,
	);

	return (
		profile && (
			<div className={styles.content}>
				<div className={styles.container}>
					<UserBlock profile={profile} profileSpecialization={profileSpecialization} />
					<InfoBlock description={profile?.description} />
					<SkillsBlock skillsList={profile?.profileSkills} />
				</div>
			</div>
		)
	);
};

export default ProfilePage as FC;
