import { CheckboxSkeleton } from '../Checkbox';
import { IconButtonSkeleton } from '../IconButton';
import { TextSkeleton } from '../Text';

import styles from './Table.module.css';

interface TableSkeletonProps {
	hasSelectors?: boolean;
	rowCount?: number;
	columnCount?: number;
	hasCopyButton?: boolean;
}

export const TableSkeleton = ({
	hasSelectors = true,
	rowCount = 10,
	columnCount = 3,
	hasCopyButton = false,
}: TableSkeletonProps) => {
	return (
		<table className={styles.table}>
			<thead className={styles.head}>
				<tr>
					{hasSelectors ? (
						<th className={styles.cell}>
							<CheckboxSkeleton />
						</th>
					) : null}

					{Array.from({ length: columnCount }).map((_, index) => (
						<th className={styles.cell} key={index}>
							<TextSkeleton variant="body3" width="10vw" />
						</th>
					))}
					<th className={styles['actions-column']}></th>
					{hasCopyButton && <th className={styles['actions-column']}></th>}
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: rowCount }).map((_, index) => (
					<tr key={index} className={styles.row}>
						{hasSelectors ? (
							<td className={styles.cell}>
								<CheckboxSkeleton />
							</td>
						) : null}
						{Array.from({ length: columnCount }).map((_, index) => (
							<td className={styles.cell} key={index}>
								<TextSkeleton variant="body3" width="80%" />
							</td>
						))}
						<td className={styles.cell}>
							<IconButtonSkeleton
								aria-label="icon skeleton"
								form="square"
								size="small"
								variant="tertiary"
							/>
						</td>
						{hasCopyButton && (
							<td className={styles.cell}>
								<IconButtonSkeleton
									aria-label="icon skeleton"
									form="square"
									size="small"
									variant="tertiary"
								/>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};
