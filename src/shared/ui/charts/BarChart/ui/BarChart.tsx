import { useEffect, useState } from 'react';

import styles from './BarChart.module.css';

/**
 * Interface representing progress data by categories.
 * @property value - Progress value from 0 to 100.
 */
interface ProgressByCategoriesData {
	value: number;
}

/**
 * Props for the BarChart component.
 * @property progress - Object with the progress value.
 */
interface BarChartProps {
	progress: ProgressByCategoriesData;
}

/**
 * BarChart component displays progress as a horizontal fill bar.
 * The fill color dynamically changes according to the progress value.
 *
 * @param progress - Progress object containing the value from 0 to 100.
 * @returns JSX.Element
 */
export const BarChart = ({ progress }: BarChartProps) => {
	const [barWidth, setBarWidth] = useState(0);
	const value = Math.min(Math.max(progress.value, 0), 100);

	useEffect(() => {
		setBarWidth(value);
	}, [value]);

	return (
		<div className={styles['bar-chart-container']}>
			<div className={styles['bar-chart']} style={{ width: `${barWidth}%` }} />
		</div>
	);
};
