import ReactECharts from 'echarts-for-react';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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

	const { t } = useI18nHelpers(i18Namespace.interview);

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
	gaugeOption.series[0].progress.show = !!passedQuestionsPercent;
	gaugeOption.series[0].detail.formatter = total
		? `{value}%\n${t(Interview.STATS_PASSED)}`
		: t(Interview.STATS_SOON);

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
