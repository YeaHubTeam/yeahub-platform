import ReactECharts from 'echarts-for-react';

import { options } from '../../model/constants/options';

interface PassedQuestionChartProps {
	total: number;
	learned: number;
	width?: string;
	height?: string;
	isLoading?: boolean;
}

export const PassedQuestionChart = ({
	isLoading,
	total,
	learned,
	width = '241px',
	height = '241px',
}: PassedQuestionChartProps) => {
	const passedQuestionsPercent = Math.round((learned / total) * 100);

	const gaugeData = [
		{
			value: passedQuestionsPercent,
			detail: {
				valueAnimation: true,
				offsetCenter: ['0%', '0%'],
			},
			itemStyle: { color: '#400799' },
		},
	];

	const gaugeOption = options.gauge;
	gaugeOption.series[0].data = gaugeData;

	return (
		<ReactECharts
			showLoading={isLoading}
			option={gaugeOption}
			opts={{ locale: 'RU' }}
			style={{
				width,
				height,
				marginInline: 'auto',
				backgroundColor: '#FDF4FF',
				borderRadius: '50%',
			}}
		/>
	);
};
