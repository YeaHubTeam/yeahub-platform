import { useEffect, useState } from 'react';

import styles from './BarChart.module.css';

interface ProgressByCategoriesData {
	value: number;
}

interface BarChartProps {
	progress: ProgressByCategoriesData;
}

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
