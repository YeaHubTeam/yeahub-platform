import ReactECharts from 'echarts-for-react';

import { options } from '../../model/options';

interface BarChartProps<T> {
	progress: T;
}

export const BarChart = <T,>({ progress }: BarChartProps<T>) => {
	const barOption = structuredClone(options.bar);

	barOption.dataset.source = [progress];

	return (
		<ReactECharts
			option={barOption}
			opts={{ locale: 'RU' }}
			style={{ height: '12px', width: '100%' }}
		/>
	);
};
