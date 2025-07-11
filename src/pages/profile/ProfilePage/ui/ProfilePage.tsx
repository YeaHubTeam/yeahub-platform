import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import {
	getActiveProfile,
	getFullProfile,
	getSpecializationId,
	profileActions,
} from '@/entities/profile';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
	const profile = useAppSelector(getFullProfile);
	const activeProfile = useAppSelector(getActiveProfile);
	const specializationId = useAppSelector(getSpecializationId);
	const { data: profileSpecialization } = useGetSpecializationByIdQuery(String(specializationId));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(profileActions.setIsEdit(true));
	}, []);

	return (
		profile && (
			<div className={styles['content']}>
				<div className={styles['main-content']}>
					<UserBlock profile={profile} profileSpecialization={profileSpecialization} />
					<InfoBlock description={activeProfile?.description} />
					<SkillsBlock skillsList={activeProfile?.profileSkills} />
				</div>
				<div className={styles['side-content-tmp']}></div>
			</div>
		)
	);
};

export default ProfilePage;
