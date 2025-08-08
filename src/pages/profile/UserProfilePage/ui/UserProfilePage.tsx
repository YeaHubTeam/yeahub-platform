import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks';

import { profileActions } from '@/entities/profile';
import { useGetSpecializationByIdQuery } from '@/entities/specialization';
import { useGetUserProfileByIdQuery } from '@/entities/user';

import { InfoBlock, SkillsBlock, UserBlock } from '@/widgets/Profile';

import styles from './UserProfilePage.module.css';

export const UserProfilePage = () => {
	const { userId = '' } = useParams<{ userId: string }>();
	const { data: profile } = useGetUserProfileByIdQuery(userId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(profileActions.setIsEdit(false));
	}, []);

	const { description, profileSkills, specializationId } = profile?.activeProfile || {};
	const { data: profileSpecialization } = useGetSpecializationByIdQuery(String(specializationId), {
		skip: !specializationId,
	});

	return (
		profile && (
			<div className={styles['content']}>
				<div className={styles['main-content']}>
					<UserBlock profile={profile} profileSpecialization={profileSpecialization} />
					<InfoBlock description={description} />
					<SkillsBlock skillsList={profileSkills} />
				</div>
				<div className={styles['side-content-tmp']}></div>
			</div>
		)
	);
};

export default UserProfilePage;
