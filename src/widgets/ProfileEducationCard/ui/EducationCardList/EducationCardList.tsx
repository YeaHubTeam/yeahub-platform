import { EDUCATION_LIST } from '@/entities/profileEducation';

import { EducationCardItem } from '../EducationCardItem/EducationCardItem';

import styles from './EducationCardList.module.css';

export const EducationCardList = () => {
	return (
		<div className={styles['education-list']}>
			{EDUCATION_LIST.map((education) => (
				<EducationCardItem key={education.id} education={education} />
			))}
		</div>
	);
};
