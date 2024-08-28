import { EDUCATION_LIST } from '@/entities/education';

import { EducationBlockItem } from '../EducationBlockItem/EducationBlockItem';

import styles from './EducationBlockList.module.css';

export const EducationBlockList = () => {
	return (
		<div className={styles['education-list']}>
			{EDUCATION_LIST.map((education) => (
				<EducationBlockItem key={education.id} education={education} />
			))}
		</div>
	);
};
