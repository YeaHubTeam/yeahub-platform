import { Card } from '@/shared/ui/Card';

import { ExperienceBlockHeader } from '../ExperienceBlockHeader/ExperienceBlockHeader';
import { ExperienceBlockList } from '../ExperienceBlockList/ExperienceBlockList';

import styles from './ExperienceBlock.module.css';

export const ExperienceBlock = () => {
	return (
		<Card expandable>
			<div className={styles['experience']}>
				<ExperienceBlockHeader />
				<ExperienceBlockList />
			</div>
		</Card>
	);
};
