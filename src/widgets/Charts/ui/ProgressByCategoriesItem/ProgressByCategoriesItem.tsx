import ReactECharts from 'echarts-for-react';

import { ProgressByCategoriesData } from '@/entities/quiz';

import { options } from '../../model/constants/options';

import styles from './ProgressByCategoriesItem.module.css';

interface ProgressByCategoriesItemProps {
	progressData: ProgressByCategoriesData;
}

export const ProgressByCategoriesItem = ({ progressData }: ProgressByCategoriesItemProps) => {
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
