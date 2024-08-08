import { FC } from 'react';
import { useParams } from 'react-router-dom';

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

import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
	// const { data, isSuccess, isLoading, isError, error } = useGetProfileQuery();

	const { profileId } = useParams<{ profileId: string }>();
	const { data: profile } = useGetProfileByIdQuery(profileId as string);

	console.log(profile);

	return (
		<div className={styles.content}>
			<div className={styles.left}>
				<UserBlock />
				<InfoBlock />
				<SkillsBlock />
				<ProjectsBlock />
				<ExperienceBlock />
				<EducationBlock />
			</div>
			<div className={styles.right}>
				<AchievmentsBlock />
			</div>
		</div>
	);
};

export default ProfilePage;
