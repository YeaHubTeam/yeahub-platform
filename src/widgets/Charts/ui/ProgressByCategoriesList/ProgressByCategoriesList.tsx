import {
	ProgressByCategoriesData,
	ProgressByCategoriesItem,
} from '../ProgressByCategoriesItem/ProgressByCategoriesItem';

import styles from './ProgressByCategoriesList.module.css';

interface Props {
	optionData: ProgressByCategoriesData[];
}

export const ProgressByCategoriesList = ({ optionData }: Props) => {
	return (
		<div className={styles.list}>
			{optionData.map((data) => (
				<ProgressByCategoriesItem key={data.category} progressData={data} />
			))}
		</div>
	);
};
