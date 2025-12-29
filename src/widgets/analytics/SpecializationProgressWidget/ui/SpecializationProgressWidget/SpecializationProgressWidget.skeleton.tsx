import { CardSkeleton } from '@/shared/ui/Card';
import { TableSkeleton } from '@/shared/ui/Table';

import { ITEMS_COUNT } from '../../model/constants';

import styles from './SpecializationProgressWidget.module.css';

export const SpecializationProgressWidgetSkeleton = () => {
	return (
		<CardSkeleton
			classNameContent={styles.table}
			actionRoute="actionRoute"
			title="title"
			isActionPositionBottom
		>
			<TableSkeleton rowCount={ITEMS_COUNT} columnCount={1} hasSelectors={false} />
		</CardSkeleton>
	);
};
