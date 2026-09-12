import { InfoBlockSkeleton } from '@/widgets/Profile/InfoBlock';
import { SkillsBlockSkeleton } from '@/widgets/Profile/SkillsBlock';
import { UserBlockSkeleton } from '@/widgets/Profile/UserBlock';

import styles from './UserProfilePage.module.css';

export const UserProfilePageSkeleton = () => {
	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<UserBlockSkeleton />
				<InfoBlockSkeleton />
				<SkillsBlockSkeleton />
			</div>
		</div>
	);
};
