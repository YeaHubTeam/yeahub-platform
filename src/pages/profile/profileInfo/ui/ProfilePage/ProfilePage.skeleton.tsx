import { InfoBlockSkeleton } from '@/widgets/Profile/InfoBlock';
import { SkillsBlockSkeleton } from '@/widgets/Profile/SkillsBlock';
import { UserBlockSkeleton } from '@/widgets/Profile/UserBlock';

import styles from './ProfilePage.module.css';

export const ProfilePageSkeleton = () => {
	return (
		<div className={styles['main-content']}>
			<UserBlockSkeleton isEdit />
			<InfoBlockSkeleton isEdit />
			<SkillsBlockSkeleton isEdit />
		</div>
	);
};
