import { FC } from 'react';

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

import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
	const { data } = useProfileQuery();

	const { data: profile } = useGetProfileByIdQuery(data?.profiles[0].profileId as string);

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
