import type { ProfileProject } from '@/entities/project';

import styles from './ProjectsBlockItem.module.css';

interface ProjectsBlockItemProps {
	project: ProfileProject;
}

export const ProjectsBlockItem = ({ project }: ProjectsBlockItemProps) => {
	const { name, imgUrl } = project;

	return (
		<div className={styles['projects-item']}>
			<div className={styles['projects-img']}>
				<img src={imgUrl} alt="" />
			</div>
			<span className={styles['projects-name']}>{name}</span>
		</div>
	);
};
