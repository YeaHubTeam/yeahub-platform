import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';

import { options } from '../../model/options';

interface GaugeChartProps {
	total: number;
	learned: number;
	width?: string;
	height?: string;
	isLoading?: boolean;
}

export const GaugeChart = ({
	isLoading,
	total,
	learned,
	width = '241px',
	height = '241px',
}: GaugeChartProps) => {
	const passedQuestionsPercent = Math.round((learned / total) * 100);

	const { t } = useTranslation(i18Namespace.interviewStatistics);

	const gaugeOption = structuredClone(options.gauge);

	gaugeOption.series[0].data = [
		{
			value: passedQuestionsPercent,
			detail: {
				valueAnimation: true,
				offsetCenter: ['0%', '0%'],
			},
			itemStyle: { color: '#400799' },
		},
	];
	gaugeOption.series[0].progress.show = !!passedQuestionsPercent;
	gaugeOption.series[0].detail.formatter = total
		? `{value}%\n${t(InterviewStatistics.PASSED)}`
		: t(InterviewStatistics.SOON);

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
				fontSize: 'var(--font-size-p-l)',
				fontWeight: 'var(--font-weight-600)',
				color: 'var(--text-color-light)',
			}}
		/>
	);
};
