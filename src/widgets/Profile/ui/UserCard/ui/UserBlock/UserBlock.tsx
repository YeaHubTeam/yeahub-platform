import { Block } from '@/shared/ui/Block';

import { Profile } from '@/entities/profile';

import { UserInfo } from '../UserBlockInfo/UserInfo';
import { UserLeftBlock } from '../UserBlockLeft/UserLeftBlock';

import styles from './UserBlock.module.css';

interface UserBlockProps {
	profile: Profile;
}

export const UserBlock = ({ profile }: UserBlockProps) => {
	return (
		<Block>
			<div className={styles.card}>
				<UserLeftBlock info={profile?.user} />
				<UserInfo profile={profile} />
			</div>
		</Block>
	);
};
