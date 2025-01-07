import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AttemptInfoItemProps } from '@/shared/ui/AttemptInfoItem';

import { options } from '../../model/options';

interface PieChartProps {
	isLoading?: boolean;
	totalAttempt: number;
	attemptData: AttemptInfoItemProps[];
}

export const PieChart = ({ isLoading, totalAttempt, attemptData }: PieChartProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile } = useScreenSize();
	const fontSize = isMobile ? 'var(--font-size-p-s)' : 'var(--font-size-p-l)';

	const pieOption = options.pie;
	pieOption.series[0].label.formatter = `${t(Translation.TOTAL_QUESTIONS)}\n ${totalAttempt}`;
	pieOption.series[0].padAngle = attemptData.some((item) => item.value === 100) ? 0 : 15;
	pieOption.series[0].data = attemptData;

	return (
		<ReactECharts
			showLoading={isLoading}
			option={pieOption}
			opts={{ locale: 'RU' }}
			style={{
				backgroundColor: '#FDF4FF',
				borderRadius: '50%',
				width: 'clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)',
				height: 'clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)',
				fontSize,
				fontWeight: 'var(--font-weight-600)',
				color: 'var(--text-color-light)',
			}}
		/>
	);
};
