import { Block } from '@/shared/ui/Block';

import { ProjectsBlockHeader } from '../ProjectsBlockHeader/ProjectsBlockHeader';
import { ProjectsBlockList } from '../ProjectsBlockList/ProjectsBlockList';

import styles from './ProjectsBlock.module.css';

export const ProjectsBlock = () => {
	return (
		<Block className={styles['projects-block']}>
			<div className={styles['projects']}>
				<ProjectsBlockHeader />
				<ProjectsBlockList />
			</div>
		</Block>
	);
};
