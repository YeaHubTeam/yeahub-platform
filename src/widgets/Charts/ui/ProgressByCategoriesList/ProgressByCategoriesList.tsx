import { ProgressByCategoriesData } from '@/entities/quiz';

import { ProgressByCategoriesItem } from '../ProgressByCategoriesItem/ProgressByCategoriesItem';

import styles from './ProgressByCategoriesList.module.css';

interface ProgressByCategoriesListProps {
	optionData: ProgressByCategoriesData[];
}

export const ProgressByCategoriesList = ({ optionData }: ProgressByCategoriesListProps) => {
	return (
		<div className={styles.list}>
			{optionData.map((data) => (
				<ProgressByCategoriesItem key={data.category} progressData={data} />
			))}
		</div>
	);
};
