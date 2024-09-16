import { Card } from '@/shared/ui/Card';

import { ProjectsBlockHeader } from '../ProjectsBlockHeader/ProjectsBlockHeader';
import { ProjectsBlockList } from '../ProjectsBlockList/ProjectsBlockList';

import styles from './ProjectsBlock.module.css';

export const ProjectsBlock = () => {
	return (
		<Card className={styles['projects-block']}>
			<div className={styles['projects']}>
				<ProjectsBlockHeader />
				<ProjectsBlockList />
			</div>
		</Card>
	);
};
