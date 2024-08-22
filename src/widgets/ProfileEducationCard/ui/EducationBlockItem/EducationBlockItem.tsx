import { FC } from 'react';

import type { ProfileEducation } from '@/entities/education';

import styles from './EducationBlockItem.module.css';

interface Props {
	education: ProfileEducation;
}

export const EducationBlockItem: FC<Props> = ({ education }) => {
	const { university, name, rank, time } = education;

	return (
		<>
			<div className={styles['education-item']}>
				<h3 className={styles['education-name-university']}>{university}</h3>
				<ul className={styles['education-info']}>
					<li className={styles['education-name']}>{name}</li>
					<li className={styles['education-rank']}>{rank}</li>
					<li className={styles['education-time']}>{time}</li>
				</ul>
			</div>
			<span className={styles['separator']}></span>
		</>
	);
};
