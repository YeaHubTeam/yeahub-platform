import { InfoBlockSkeleton } from '@/widgets/Profile/InfoBlock';
import { SkillsBlockSkeleton } from '@/widgets/Profile/SkillsBlock';
import { UserBlockSkeleton } from '@/widgets/Profile/UserBlock';

import styles from './ProfilePage.module.css';

export const ProfilePageSkeleton = () => {
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
