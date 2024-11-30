import { FC } from 'react';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile, getSpecializationId } from '@/entities/profile';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
	const profile = useAppSelector(getFullProfile);
	const specializationId = useAppSelector(getSpecializationId);
	const { data: profileSpecialization } = useGetSpecializationByIdQuery(String(specializationId));

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
