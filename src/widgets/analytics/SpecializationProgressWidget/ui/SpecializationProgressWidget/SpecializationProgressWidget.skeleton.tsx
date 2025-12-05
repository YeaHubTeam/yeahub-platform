import { CardSkeleton } from '@/shared/ui/Card';
import { TableSkeleton } from '@/shared/ui/Table';

import styles from './SpecializationProgressWidget.module.css';

const ROWS_COUNT = 5;

export const SpecializationProgressWidgetSkeleton = () => {
	return (
		<CardSkeleton
			classNameContent={styles.table}
			actionRoute="actionRoute"
			title="title"
			isActionPositionBottom
		>
			<TableSkeleton rowCount={ROWS_COUNT} columnCount={1} hasSelectors={false} />
		</CardSkeleton>
	);
};
