import { FC } from 'react';

import { Block } from '@/shared/ui/Block';

import { AchievmentsBlockHeader, AchievmentsBlockList } from '@/widgets/ProfileAchievementCard';
import { EducationCardList, EducationCardHeader } from '@/widgets/ProfileEducationCard';
import { ExperienceBlockHeader, ExperienceBlockList } from '@/widgets/ProfileExperienceCard';
import { InfoBlockHeader, InfoBlockText } from '@/widgets/ProfileInfoCard';
import { ProjectsBlockHeader, ProjectsBlockList } from '@/widgets/ProfileProjectsCard';
import { SkillsBlockHeader, SkillsBlockList } from '@/widgets/ProfileSkillsCard';
import { UserLeftBlock, UserInfo } from '@/widgets/ProfileUserCard';

import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
	// const { data, isSuccess, isLoading, isError, error } = useGetProfileQuery();

	return (
		<div className={styles.content}>
			<div className={styles.left}>
				{/* Блок Пользователя */}
				<Block>
					<div className={styles.card}>
						<UserLeftBlock />
						<UserInfo />
					</div>
				</Block>

				{/* Блок "Обо мне" */}
				<Block expandable>
					<div className={styles['info']}>
						<InfoBlockHeader />
						<InfoBlockText />
					</div>
				</Block>

				{/* Блок Навыки */}
				<Block>
					<div className={styles['skills']}>
						<SkillsBlockHeader />
						<SkillsBlockList />
					</div>
				</Block>

				{/* Блок проекты */}
				<Block className={styles['projects-block']}>
					<div className={styles['projects']}>
						<ProjectsBlockHeader />
						<ProjectsBlockList />
					</div>
				</Block>

				{/* Блок опыта */}
				<Block expandable>
					<div className={styles['experience']}>
						<ExperienceBlockHeader />
						<ExperienceBlockList />
					</div>
				</Block>

				{/* Блок Образование */}

				<Block expandable>
					<div className={styles['education']}>
						<EducationCardHeader />
						<EducationCardList />
					</div>
				</Block>
			</div>
			<div className={styles.right}>
				<Block>
					<div className={styles['achievement']}>
						<AchievmentsBlockHeader />
						<AchievmentsBlockList />
					</div>
				</Block>
			</div>
		</div>
	);
};

export default ProfilePage;
