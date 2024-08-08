import { PROJECT_LIST } from '@/entities/profileProject';

import { ProjectsBlockItem } from '../ProjectsBlockItem/ProjectsBlockItem';

import styles from './ProjectsBlockList.module.css';

export const ProjectsBlockList = () => {
	return (
		<div className={styles['projects-list']}>
			{PROJECT_LIST.map((project) => (
				<ProjectsBlockItem key={project.id} project={project} />
			))}
		</div>
	);
};
