import { FC } from 'react';

import { useProfileQuery } from '@/entities/auth';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
	const { data: profile } = useProfileQuery();

	const { data: profileSpecialization } = useGetSpecializationByIdQuery({
		specializationId: String(profile?.profiles[0].specializationId),
	});

	return (
		profile && (
			<div className={styles['content']}>
				<div className={styles['main-content']}>
					<UserBlock profile={profile} profileSpecialization={profileSpecialization} />
					<InfoBlock description={profile?.profiles[0].description} />
					<SkillsBlock skillsList={profile?.profiles[0].profileSkills} />
				</div>
				<div className={styles['side-content-tmp']}></div>
			</div>
		)
	);
};

export default ProfilePage as FC;
