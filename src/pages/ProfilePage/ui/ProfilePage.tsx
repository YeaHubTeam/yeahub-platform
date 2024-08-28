import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import { useProfileQuery } from '@/entities/auth';
import { useGetProfileByIdQuery } from '@/entities/profile';

import {
	AchievmentsBlock,
	EducationBlock,
	ExperienceBlock,
	InfoBlock,
	ProjectsBlock,
	SkillsBlock,
	UserBlock,
} from '@/widgets/Profile';

import { getProfilePageState } from '../model/selector/profilePageSelector';
import { profilePageActions } from '../model/slices/ProfilePageSlice';

import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
	const { data } = useProfileQuery();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) {
			dispatch(profilePageActions.setProfileId(data.profiles[0].profileId as string));
		}
	}, [data, dispatch]);

	const { profileId } = useSelector(getProfilePageState);

	const { data: profile } = useGetProfileByIdQuery(profileId as string, {
		skip: !profileId,
	});

	return (
		profile && (
			<div className={styles.content}>
				<div className={styles.left}>
					<UserBlock profile={profile} />
					<InfoBlock description={profile?.description} />
					<SkillsBlock skillsList={profile?.profileSkills} />
					<ProjectsBlock />
					<ExperienceBlock />
					<EducationBlock />
				</div>
				<div className={styles.right}>
					<AchievmentsBlock />
				</div>
			</div>
		)
	);
};

export default ProfilePage;
