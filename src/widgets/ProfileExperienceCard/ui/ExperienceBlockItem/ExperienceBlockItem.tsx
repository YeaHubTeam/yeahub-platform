import { FC } from 'react';

import type { ProfileExperience } from '@/entities/experience';

import styles from './ExperienceBlockItem.module.css';

interface Props {
	experience: ProfileExperience;
}

export const ExperienceBlockItem: FC<Props> = ({ experience }) => {
	const { name, imgUrl, company, schedule, seniority, location } = experience;

	return (
		<>
			<div className={styles['experience-item']}>
				<div className={styles['experience-logo']}>
					<img src={imgUrl} alt="" />
				</div>
				<div className={styles['experience-content']}>
					<h3 className={styles['experience-name']}>{name}</h3>
					<ul className={styles['experience-info']}>
						<li className={styles['experience-company']}>{company}</li>
						<li className={styles['experience-schedule']}>{schedule}</li>
						<li className={styles['experience-seniority']}>{seniority}</li>
					</ul>
					<span className={styles['experience-location']}>{location}</span>
				</div>
			</div>
			<span className={styles['separator']}></span>
		</>
	);
};
