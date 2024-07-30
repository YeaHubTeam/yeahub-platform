import ReactECharts from 'echarts-for-react';

import { options } from '../../model/constants/options';

import styles from './ProgressByCategoriesItem.module.css';

export interface ProgressByCategoriesData {
	category: string;
	passed: number;
	total: number;
	value: number;
}

interface Props {
	progressData: ProgressByCategoriesData;
}

export const ProgressByCategoriesItem = ({ progressData }: Props) => {
	const { category, total, passed } = progressData;

	const barOption = structuredClone(options.bar);

	barOption.dataset.source = [progressData];

	return (
		<div className={styles.item}>
			<div className={styles.header}>
				<span>{category}</span>
				<span>
					{passed}/{total}
				</span>
			</div>

			<ReactECharts
				option={barOption}
				opts={{ locale: 'RU' }}
				style={{ height: '12px', width: '100%' }}
			/>
		</div>
	);
};
