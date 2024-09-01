// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AchievmentsBlock } from '@/widgets/ProfileAchievementCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EducationBlock } from '@/widgets/ProfileEducationCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExperienceBlock } from '@/widgets/ProfileExperienceCard';
import { InfoBlock } from '@/widgets/ProfileInfoCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProjectsBlock } from '@/widgets/ProfileProjectsCard';
import { SkillsBlock } from '@/widgets/ProfileSkillsCard';
import { UserCard } from '@/widgets/ProfileUserCard';

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
	// const { data, isSuccess, isLoading, isError, error } = useGetProfileQuery();

	return (
		<div className={styles.content}>
			<div className={styles.left}>
				<UserCard />
				<InfoBlock />
				<SkillsBlock />
				{/* <ProjectsBlock /> */}
				{/* <ExperienceBlock /> */}
				{/* <EducationBlock /> */}
			</div>
			{/* <div className={styles.right}>
				<AchievmentsBlock />
			</div> */}
		</div>
	);
};

export default ProfilePage;
