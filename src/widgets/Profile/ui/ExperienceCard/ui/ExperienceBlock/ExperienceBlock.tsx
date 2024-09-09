import { Block } from '@/shared/ui/Block';

import { ExperienceBlockHeader } from '../ExperienceBlockHeader/ExperienceBlockHeader';
import { ExperienceBlockList } from '../ExperienceBlockList/ExperienceBlockList';

import styles from './ExperienceBlock.module.css';

export const ExperienceBlock = () => {
	return (
		<Block expandable>
			<div className={styles['experience']}>
				<ExperienceBlockHeader />
				<ExperienceBlockList />
			</div>
		</Block>
	);
};
