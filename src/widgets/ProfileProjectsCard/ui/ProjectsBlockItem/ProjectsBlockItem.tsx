import { FC } from 'react';

import { ProfileProject } from '@/entities/profileProject';

import styles from './ProjectsBlockItem.module.css';

interface Props {
	project: ProfileProject;
}

export const ProjectsBlockItem: FC<Props> = ({ project }) => {
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
